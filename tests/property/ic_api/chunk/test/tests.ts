import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

// Currently the instruction limit of 40_000_000_000 is hit at about 18_750_000 loops
// So we are rounding up a bit and using 20_000_000 loops to ensure that the instruction limit is hit
export function getTests(): Test {
    return () => {
        const updateCallInstructionLimit = 40_000_000_000n;

        it('should hit the instruction limit without chunking', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 200
                    }),
                    async (constant) => {
                        await expect(
                            actor.measureSum(
                                20_000_000 + 1_000_000 * constant,
                                false
                            )
                        ).rejects.toThrow(
                            'Canister exceeded the limit of 40000000000 instructions for single message execution'
                        );
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should not hit the instruction limit with chunking', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 200
                    }),
                    async (constant) => {
                        const instructions = await actor.measureSum(
                            20_000_000 + 1_000_000 * constant,
                            true
                        );

                        expect(instructions).toBeGreaterThanOrEqual(
                            updateCallInstructionLimit
                        );
                    }
                ),
                defaultPropTestParams
            );
        });

        it('should not hit the instruction limit with chunking in a timer', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 200
                    }),
                    async (constant) => {
                        await actor.measureSumTimer(
                            20_000_000 + 1_000_000 * constant,
                            true
                        );

                        // We want to give the timer enough time to at least get started
                        await new Promise((resolve) =>
                            setTimeout(resolve, 5_000)
                        );

                        let continueLoop: boolean = true;

                        while (continueLoop) {
                            const timerStarted = await actor.getTimerStarted();

                            expect(timerStarted).toStrictEqual(true);

                            const timerEnded = await actor.getTimerEnded();

                            if (timerEnded === true) {
                                const timerInstructions =
                                    await actor.getTimerInstructions();

                                expect(
                                    timerInstructions
                                ).toBeGreaterThanOrEqual(
                                    updateCallInstructionLimit
                                );

                                continueLoop = false;
                            } else {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 5_000)
                                );
                            }
                        }
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
