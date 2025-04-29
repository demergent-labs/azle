import { ActorSubclass } from '@dfinity/agent';
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

            describe.each([
                { name: 'Int8Array', bytesPerElement: 1 },
                { name: 'Uint8Array', bytesPerElement: 1 },
                { name: 'Uint8ClampedArray', bytesPerElement: 1 },
                { name: 'Int16Array', bytesPerElement: 2 },
                { name: 'Uint16Array', bytesPerElement: 2 },
                { name: 'Int32Array', bytesPerElement: 4 },
                { name: 'Uint32Array', bytesPerElement: 4 },
                { name: 'BigInt64Array', bytesPerElement: 8 },
                { name: 'BigUint64Array', bytesPerElement: 8 }
            ])(
                'crypto.getRandomValues with $name',
                ({ name, bytesPerElement }) => {
                    it(`should fill the ${name} correctly and return the correct byte length`, async () => {
                        const actor = await getCanisterActor<Actor>('canister');
                        const maxElements = Math.floor(
                            65_536 / bytesPerElement
                        );

                        await fc.assert(
                            fc.asyncProperty(
                                fc.nat(maxElements),
                                fc.integer({ min: 2, max: 10 }),
                                async (length, numCalls) => {
                                    await validateCryptoGetRandomValuesForType(
                                        actor,
                                        name,
                                        bytesPerElement,
                                        length,
                                        numCalls,
                                        true
                                    );
                                }
                            ),
                            defaultPropTestParams()
                        );
                    });

                    it(`should throw quota exceeded error for ${name} with byte length > 65_536`, async () => {
                        const actor = await getCanisterActor<Actor>('canister');
                        const minElementsToExceed =
                            Math.floor(65_536 / bytesPerElement) + 1;

                        await fc.assert(
                            fc.asyncProperty(
                                fc.integer({
                                    min: minElementsToExceed,
                                    max: 1_000_000
                                }),
                                async (length) => {
                                    await expect(
                                        actor.cryptoGetRandomValuesForType(
                                            name,
                                            length
                                        )
                                    ).rejects.toThrow(
                                        'QuotaExceeded: array cannot be larger than 65_536 bytes'
                                    );
                                }
                            ),
                            defaultPropTestParams()
                        );
                    });

                    it(`should produce the same random values when using the same seed`, async () => {
                        const actor = await getCanisterActor<Actor>('canister');
                        const maxElements = Math.floor(
                            65_536 / bytesPerElement
                        );

                        await fc.assert(
                            fc.asyncProperty(
                                fc.nat(maxElements),
                                fc.integer({ min: 2, max: 10 }),
                                fc.uint8Array({
                                    minLength: 32,
                                    maxLength: 32
                                }),
                                async (length, numCalls, seed) => {
                                    await actor.seed(seed);

                                    await validateCryptoGetRandomValuesForType(
                                        actor,
                                        name,
                                        bytesPerElement,
                                        length,
                                        numCalls,
                                        true,
                                        true
                                    );

                                    await actor.seed(seed);

                                    await validateCryptoGetRandomValuesForType(
                                        actor,
                                        name,
                                        bytesPerElement,
                                        length,
                                        numCalls,
                                        false
                                    );
                                }
                            ),
                            defaultPropTestParams()
                        );
                    });

                    it(`should throw error for seed length not equal to 32 for ${name}`, async () => {
                        const actor = await getCanisterActor<Actor>('canister');
                        await fc.assert(
                            fc.asyncProperty(
                                fc.oneof(
                                    fc.uint8Array({
                                        minLength: 0,
                                        maxLength: 31
                                    }),
                                    fc.uint8Array({
                                        minLength: 33,
                                        maxLength: 1_024
                                    })
                                ),
                                async (seed) => {
                                    await expect(
                                        actor.seed(seed)
                                    ).rejects.toThrow(
                                        'seed must be exactly 32 bytes in length'
                                    );
                                }
                            ),
                            defaultPropTestParams()
                        );
                    });
                }
            );
        });
    };
}

async function validateCryptoGetRandomValuesForType(
    actor: ActorSubclass<Actor>,
    name: string,
    bytesPerElement: number,
    length: number,
    numCalls: number,
    randomResultsShouldBeUnique: boolean,
    shouldResetRandomResults: boolean = false
): Promise<void> {
    if (shouldResetRandomResults === true) {
        resetPastRandomResults();
    }

    const randomResults = await Promise.all(
        Array(numCalls)
            .fill(0)
            .map(() => actor.cryptoGetRandomValuesForType(name, length))
    );

    randomResults.forEach((randomResult) => {
        expect(randomResultIsUnique(randomResult)).toBe(
            randomResultsShouldBeUnique
        );

        const expectedByteLength = length * bytesPerElement;

        expect(randomResult.length).toBe(expectedByteLength);

        for (const byte of randomResult) {
            expect(byte).toBeGreaterThanOrEqual(0);
            expect(byte).toBeLessThanOrEqual(255);
        }
    });
}

let pastRandomResults: Set<string> = new Set();

function randomResultIsUnique(randomResult: Uint8Array | number[]): boolean {
    const sizeBefore = pastRandomResults.size;
    pastRandomResults.add(randomResult.toString());
    const sizeAfter = pastRandomResults.size;

    return sizeAfter === sizeBefore + 1;
}

function resetPastRandomResults(): void {
    pastRandomResults = new Set();
}
