import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('cryptoGetRandomValues should produce different results for multiple calls with the default seed', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 2, max: 10 }),
                    async (length, numCalls) => {
                        let results = new Set<string>();

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            results.add(result.toString());
                        }

                        expect(results.size).toBe(numCalls);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('cryptoGetRandomValues should be reproducible when seeded', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 2, max: 10 }),
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    async (length, numCalls, seed) => {
                        await actor.seed(seed);

                        let results: string[] = [];

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);
                            results.push(result.toString());
                        }

                        await actor.seed(seed);

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            expect(result.toString()).toBe(results[i]);
                        }
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should throw error for seed length not equal to 32', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.oneof(
                        fc.uint8Array({ minLength: 0, maxLength: 31 }),
                        fc.uint8Array({ minLength: 33, maxLength: 1_024 })
                    ),
                    async (seed) => {
                        await expect(actor.seed(seed)).rejects.toThrow(
                            'seed must be exactly 32 bytes in length'
                        );
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}
