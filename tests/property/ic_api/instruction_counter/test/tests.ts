import { defaultParams, expect, getCanisterActor, it, Test } from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should calculate instructions accurately from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 100 // Our algorithm for determinstically checking the number of instructions based on the number of loops breaks down soon after 100 iterations
                    }),
                    async (loops) => {
                        const instructions =
                            await actor.queryInstructionCounter(loops);

                        const {
                            loops0Instructions,
                            zeroToOneDelta,
                            oneToTwoDelta
                        } = await getBaseInstructionCountsQuery();

                        expect(instructions).toStrictEqual(
                            loops0Instructions +
                                (loops === 0
                                    ? 0n
                                    : loops === 1
                                    ? zeroToOneDelta
                                    : zeroToOneDelta +
                                      (BigInt(loops) - 1n) * oneToTwoDelta)
                        );
                    }
                ),
                defaultParams
            );
        });

        // This test is much different than the query test because for some reason
        // the number of instructions per call and even per call with the same number of loops
        // is not consistent in a few ways. For example calling loops 0 repeatedly returns
        // a different number of instructions in the first few calls
        it('should calculate instructions accurately from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 1_000_000
                    }),
                    async (loops) => {
                        const instructionsLoops0 =
                            await actor.updateInstructionCounter(0);

                        const instructions0 =
                            await actor.updateInstructionCounter(loops);
                        const instructions1 =
                            await actor.updateInstructionCounter(loops);

                        const instructionsAfter0 =
                            await actor.updateInstructionCounter(loops + 1);
                        const instructionsAfter1 =
                            await actor.updateInstructionCounter(loops + 1);

                        expect(instructionsLoops0).not.toStrictEqual(0n);

                        expect(
                            bigIntAbs(instructions0 - instructions1)
                        ).toBeLessThan(1_000n);

                        expect(
                            bigIntAbs(instructionsAfter0 - instructionsAfter1)
                        ).toBeLessThan(1_000n);

                        expect(instructions0).toBeLessThan(instructionsAfter0);
                        expect(instructions1).toBeLessThan(instructionsAfter1);
                    }
                ),
                defaultParams
            );
        });
    };
}

type BaseInstructionCounts = {
    loops0Instructions: bigint;
    loops1Instructions: bigint;
    loops2Instructions: bigint;
    zeroToOneDelta: bigint;
    oneToTwoDelta: bigint;
};

async function getBaseInstructionCountsQuery(): Promise<BaseInstructionCounts> {
    const actor = await getCanisterActor<Actor>('canister');

    await actor.queryInstructionCounter(0);
    await actor.queryInstructionCounter(0);

    const loops0Instructions = await actor.queryInstructionCounter(0);
    const loops1Instructions = await actor.queryInstructionCounter(1);
    const loops2Instructions = await actor.queryInstructionCounter(2);

    const zeroToOneDelta = loops1Instructions - loops0Instructions;
    const oneToTwoDelta = loops2Instructions - loops1Instructions;

    return {
        loops0Instructions,
        loops1Instructions,
        loops2Instructions,
        zeroToOneDelta,
        oneToTwoDelta
    };
}

function bigIntAbs(x: bigint): bigint {
    return x < 0 ? -x : x;
}
