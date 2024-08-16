import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should calculate performanceCounter(0) instructions accurately from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 100 // Our algorithm for deterministically checking the number of instructions based on the number of loops breaks down soon after 100 iterations
                    }),
                    async (loops) => {
                        const instructions =
                            await actor.queryPerformanceCounter0(loops);

                        const {
                            loops0Instructions,
                            zeroToOneDelta,
                            oneToTwoDelta
                        } = await getBaseInstructionCountsQuery0();

                        expect(instructions).toStrictEqual(
                            getExpectedQueryInstructions(
                                loops,
                                loops0Instructions,
                                zeroToOneDelta,
                                oneToTwoDelta
                            )
                        );
                    }
                ),
                defaultPropTestParams
            );
        });

        // This test is much different than the query test because for some reason
        // the number of instructions per call and even per call with the same number of loops
        // is not consistent in a few ways. For example calling loops 0 repeatedly returns
        // a different number of instructions in the first few calls
        it('should calculate performanceCounter(0) instructions accurately from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 1_000_000
                    }),
                    async (loops) => {
                        const instructionsLoops0 =
                            await actor.updatePerformanceCounter0(0);

                        const instructions0 =
                            await actor.updatePerformanceCounter0(loops);
                        const instructions1 =
                            await actor.updatePerformanceCounter0(loops);

                        const instructionsAfter0 =
                            await actor.updatePerformanceCounter0(loops + 1);
                        const instructionsAfter1 =
                            await actor.updatePerformanceCounter0(loops + 1);

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
                defaultPropTestParams
            );
        });

        it('should calculate performanceCounter(1) instructions accurately from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 100 // Our algorithm for deterministically checking the number of instructions based on the number of loops breaks down soon after 100 iterations
                    }),
                    async (loops) => {
                        const instructions =
                            await actor.queryPerformanceCounter1(loops);

                        const {
                            loops0Instructions,
                            zeroToOneDelta,
                            oneToTwoDelta
                        } = await getBaseInstructionCountsQuery1();

                        expect(instructions).toStrictEqual(
                            getExpectedQueryInstructions(
                                loops,
                                loops0Instructions,
                                zeroToOneDelta,
                                oneToTwoDelta
                            )
                        );
                    }
                ),
                defaultPropTestParams
            );
        });

        // This test is much different than the query test because for some reason
        // the number of instructions per call and even per call with the same number of loops
        // is not consistent in a few ways. For example calling loops 0 repeatedly returns
        // a different number of instructions in the first few calls
        it('should calculate performanceCounter(1) instructions accurately from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 1_000_000
                    }),
                    async (loops) => {
                        const instructionsLoops0 =
                            await actor.updatePerformanceCounter1(0);

                        const instructions0 =
                            await actor.updatePerformanceCounter1(loops);
                        const instructions1 =
                            await actor.updatePerformanceCounter1(loops);

                        const instructionsAfter0 =
                            await actor.updatePerformanceCounter1(loops + 100);
                        const instructionsAfter1 =
                            await actor.updatePerformanceCounter1(loops + 100);

                        expect(instructionsLoops0).not.toStrictEqual(0n);

                        expect(
                            percentageDifferenceBigInt(
                                instructions0,
                                instructions1
                            )
                        ).toBeLessThanOrEqual(5n);

                        expect(
                            percentageDifferenceBigInt(
                                instructionsAfter0,
                                instructionsAfter1
                            )
                        ).toBeLessThanOrEqual(5n);

                        expect(instructions0).toBeLessThan(instructionsAfter0);
                        expect(instructions1).toBeLessThan(instructionsAfter1);
                    }
                ),
                defaultPropTestParams
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

async function getBaseInstructionCountsQuery0(): Promise<BaseInstructionCounts> {
    const actor = await getCanisterActor<Actor>('canister');

    await actor.queryPerformanceCounter0(0);
    await actor.queryPerformanceCounter0(0);

    const loops0Instructions = await actor.queryPerformanceCounter0(0);
    const loops1Instructions = await actor.queryPerformanceCounter0(1);
    const loops2Instructions = await actor.queryPerformanceCounter0(2);

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

async function getBaseInstructionCountsQuery1(): Promise<BaseInstructionCounts> {
    const actor = await getCanisterActor<Actor>('canister');

    await actor.queryPerformanceCounter1(0);
    await actor.queryPerformanceCounter1(0);

    const loops0Instructions = await actor.queryPerformanceCounter1(0);
    const loops1Instructions = await actor.queryPerformanceCounter1(1);
    const loops2Instructions = await actor.queryPerformanceCounter1(2);

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

function percentageDifferenceBigInt(value1: bigint, value2: bigint): bigint {
    const difference = value1 > value2 ? value1 - value2 : value2 - value1;
    const average = (value1 + value2) / 2n;
    const percentageDifference = (difference * 100n) / average;
    return percentageDifference;
}

function getExpectedQueryInstructions(
    loops: number,
    loops0Instructions: bigint,
    zeroToOneDelta: bigint,
    oneToTwoDelta: bigint
): bigint {
    if (loops === 0) {
        return loops0Instructions;
    }

    if (loops === 1) {
        return loops0Instructions + zeroToOneDelta;
    }

    return (
        loops0Instructions +
        zeroToOneDelta +
        (BigInt(loops) - 1n) * oneToTwoDelta
    );
}
