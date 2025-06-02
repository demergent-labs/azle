import { describe } from '@jest/globals';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

type TestCase = {
    counterType: 0 | 1;
    method:
        | 'queryPerformanceCounter0'
        | 'updatePerformanceCounter0'
        | 'queryPerformanceCounter1'
        | 'updatePerformanceCounter1';
    type: 'query' | 'update';
};

export function getTests(): Test {
    return () => {
        const testCases: TestCase[] = [
            {
                counterType: 0,
                method: 'queryPerformanceCounter0',
                type: 'query'
            },
            {
                counterType: 0,
                method: 'updatePerformanceCounter0',
                type: 'update'
            },
            {
                counterType: 1,
                method: 'queryPerformanceCounter1',
                type: 'query'
            },
            {
                counterType: 1,
                method: 'updatePerformanceCounter1',
                type: 'update'
            }
        ];

        describe.each(testCases)(
            'test performanceCounter',
            ({ counterType, method, type }) => {
                it(`should calculate performanceCounter(${counterType}) instructions accurately from a ${type} method`, async () => {
                    const actor = await getCanisterActor<Actor>('canister');

                    await fc.assert(
                        fc.asyncProperty(
                            fc.nat({
                                max: 1_000_000
                            }),
                            async (loops) => {
                                const instructionsLoops0 =
                                    await actor[method](0);

                                const instructions0 =
                                    await actor[method](loops);
                                const instructions1 =
                                    await actor[method](loops);

                                const instructionsAfter0 = await actor[method](
                                    loops + 1_000
                                );
                                const instructionsAfter1 = await actor[method](
                                    loops + 1_000
                                );

                                expect(instructionsLoops0).toBeGreaterThan(0n);
                                expect(instructions0).toBeGreaterThan(0n);
                                expect(instructions1).toBeGreaterThan(0n);
                                expect(instructionsAfter0).toBeGreaterThan(0n);
                                expect(instructionsAfter1).toBeGreaterThan(0n);

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

                                expect(instructions0).toBeLessThan(
                                    instructionsAfter0
                                );
                                expect(instructions1).toBeLessThan(
                                    instructionsAfter1
                                );
                            }
                        ),
                        defaultPropTestParams()
                    );
                });
            }
        );

        it('asserts performanceCounter static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes(0)).toBe(true);
            expect(await actor.assertTypes(1)).toBe(true);
        });
    };
}

function percentageDifferenceBigInt(value1: bigint, value2: bigint): bigint {
    const difference = value1 > value2 ? value1 - value2 : value2 - value1;
    const average = (value1 + value2) / 2n;
    const percentageDifference = (difference * 100n) / average;
    return percentageDifference;
}
