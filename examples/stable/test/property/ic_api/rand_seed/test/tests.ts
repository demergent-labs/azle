import { describe } from '@jest/globals';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    please,
    Test
} from 'azle/_internal/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        describe.each([
            { name: 'initial' },
            { name: 'after upgrade-unchanged' },
            { name: 'after reinstall' }
        ])('round $name', (roundName) => {
            if (roundName.name === 'after upgrade-unchanged') {
                please('deploy with --upgrade-unchanged', async () => {
                    execSync('dfx deploy canister --upgrade-unchanged');
                });
            }

            if (roundName.name === 'after reinstall') {
                please('reinstall canister', async () => {
                    execSync('dfx canister uninstall-code canister');
                    execSync('dfx deploy canister');
                });
            }

            it('should not throw for seed length equal to 32', async () => {
                const actor = await getCanisterActor<Actor>('canister');

                await fc.assert(
                    fc.asyncProperty(
                        fc.uint8Array({ minLength: 32, maxLength: 32 }),
                        async (seed) => {
                            await actor.seed(seed);
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
                            fc.uint8Array({ minLength: 33, maxLength: 1024 })
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

            // Test cryptoGetRandomValues randomness
            it('cryptoGetRandomValues should produce different results for multiple calls without seeding', async () => {
                const actor = await getCanisterActor<Actor>('canister');
                await fc.assert(
                    fc.asyncProperty(
                        fc.integer({ min: 1, max: 100 }),
                        fc.integer({ min: 2, max: 10 }),
                        async (length, numCalls) => {
                            const results = new Set<string>();
                            for (let i = 0; i < numCalls; i++) {
                                const arr =
                                    await actor.cryptoGetRandomValues(length);
                                results.add(arr.toString());
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
                            const firstResults: string[] = [];
                            for (let i = 0; i < numCalls; i++) {
                                const arr =
                                    await actor.cryptoGetRandomValues(length);
                                firstResults.push(arr.toString());
                            }
                            await actor.seed(seed);
                            for (let i = 0; i < numCalls; i++) {
                                const arr =
                                    await actor.cryptoGetRandomValues(length);
                                expect(arr.toString()).toBe(firstResults[i]);
                            }
                        }
                    ),
                    defaultPropTestParams()
                );
            });
        });
    };
}
