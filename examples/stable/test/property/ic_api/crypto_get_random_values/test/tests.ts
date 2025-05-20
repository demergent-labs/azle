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

            // If we're running the short test, only test Uint8Array
            let typedArrays;

            if (shouldRunShortTest() === true) {
                typedArrays = [{ name: 'Uint8Array', bytesPerElement: 1 }];
            } else {
                typedArrays = [
                    { name: 'Int8Array', bytesPerElement: 1 },
                    { name: 'Uint8Array', bytesPerElement: 1 },
                    { name: 'Uint8ClampedArray', bytesPerElement: 1 },
                    { name: 'Int16Array', bytesPerElement: 2 },
                    { name: 'Uint16Array', bytesPerElement: 2 },
                    { name: 'Int32Array', bytesPerElement: 4 },
                    { name: 'Uint32Array', bytesPerElement: 4 },
                    { name: 'BigInt64Array', bytesPerElement: 8 },
                    { name: 'BigUint64Array', bytesPerElement: 8 }
                ];
            }

            describe.each(typedArrays)(
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
                                async (length, rawNumCalls) => {
                                    const numCalls = normalizeNumCalls(
                                        length,
                                        rawNumCalls
                                    );

                                    await validateCryptoGetRandomValues(
                                        actor,
                                        name,
                                        bytesPerElement,
                                        length,
                                        numCalls
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
                                        actor.cryptoGetRandomValues(
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
                }
            );
        });
    };
}

async function validateCryptoGetRandomValues(
    actor: ActorSubclass<Actor>,
    name: string,
    bytesPerElement: number,
    length: number,
    numCalls: number
): Promise<void> {
    const randomResults = await Promise.all(
        Array(numCalls)
            .fill(0)
            .map(() => actor.cryptoGetRandomValues(name, length))
    );

    randomResults.forEach((randomResult) => {
        expect(randomResultIsUnique(randomResult)).toBe(true);

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
    if (randomResult.length === 0) {
        return true;
    }

    const sizeBefore = pastRandomResults.size;
    pastRandomResults.add(Buffer.from(randomResult).toString('hex'));
    const sizeAfter = pastRandomResults.size;

    return sizeAfter === sizeBefore + 1;
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
    // Limit to 2 calls when length === 1 to attempt to keep collision risk ≈1%
    if (length === 1) {
        return numCalls > 2 ? 2 : numCalls;
    }

    return numCalls;
}

/**
 * Determines whether to run the short version of the test (Uint8Array only).
 *
 * @returns true if running in a feature branch PR, draft PR, or main branch push from feature merge
 */
function shouldRunShortTest(): boolean {
    return (
        process.env.AZLE_IS_FEATURE_BRANCH_PR === 'true' ||
        process.env.AZLE_IS_FEATURE_BRANCH_DRAFT_PR === 'true' ||
        process.env.AZLE_IS_MAIN_BRANCH_PUSH_FROM_FEATURE_MERGE === 'true'
    );
}
