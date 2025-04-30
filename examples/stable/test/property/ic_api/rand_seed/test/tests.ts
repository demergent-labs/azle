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
        it('should produce distinct results from cryptoGetRandomValues for multiple calls with the default seed', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 2, max: 10 }),
                    async (length, rawNumCalls) => {
                        const numCalls = normalizeNumCalls(length, rawNumCalls);

                        let results = new Set<string>();

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            results.add(Buffer.from(result).toString('hex'));
                        }

                        expect(results.size).toBe(numCalls);
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should produce the same results from cryptoGetRandomValues when using the same seed', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 2, max: 10 }),
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    async (length, rawNumCalls, seed) => {
                        const numCalls = normalizeNumCalls(length, rawNumCalls);

                        await actor.seed(seed);

                        let results: string[] = [];

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            results.push(Buffer.from(result).toString('hex'));
                        }

                        await actor.seed(seed);

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            expect(Buffer.from(result).toString('hex')).toBe(
                                results[i]
                            );
                        }
                    }
                ),
                defaultPropTestParams()
            );
        });

        it('should produce distinct results from cryptoGetRandomValues when using different seeds', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 2, max: 10 }),
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    fc.uint8Array({ minLength: 32, maxLength: 32 }),
                    async (length, rawNumCalls, seed1, seed2) => {
                        const numCalls = normalizeNumCalls(length, rawNumCalls);

                        await actor.seed(seed1);

                        let results: string[] = [];

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            results.push(Buffer.from(result).toString('hex'));
                        }

                        await actor.seed(seed2);

                        for (let i = 0; i < numCalls; i++) {
                            const result =
                                await actor.cryptoGetRandomValues(length);

                            expect(
                                Buffer.from(result).toString('hex')
                            ).not.toBe(results[i]);
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

/**
 * Normalize the number of calls to avoid collisions in returned randomness.
 *
 * @param length - The length of the random values to generate
 * @param numCalls - The number of calls to make
 *
 * @returns The normalized number of calls.
 */
function normalizeNumCalls(length: number, numCalls: number): number {
    // The hope is that limiting numCalls to 3 for a length of 1 will
    // make the probability of collisions only 1%, which is hopefully
    // practically acceptable for these tests
    if (length === 1) {
        return numCalls > 3 ? 3 : numCalls;
    }

    return numCalls;
}
