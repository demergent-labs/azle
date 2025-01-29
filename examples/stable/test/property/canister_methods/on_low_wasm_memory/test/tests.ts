import { afterAll, beforeAll } from '@jest/globals';
import { Principal } from 'azle';
import { getCanisterId } from 'azle/dfx';
import {
    captureAssertionOutput,
    defaultPropTestParams,
    expect,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';
import {
    configureDfxJsonWasmMemorySettings,
    deployFreshCanister,
    getCanisterStatus,
    resetDfxJson
} from './helpers/dfx';

const HARD_LIMIT = 3.5 * 1024 * 1024 * 1024; // 3.5 GiB in bytes (We can't use 4 GiB because we need enough memory to successfully finish a call)
const CANISTER_NAME = 'canister';

export function getTests(): Test {
    return () => {
        beforeAll(async () => {
            await resetDfxJson(CANISTER_NAME);
        });

        afterAll(async () => {
            await resetDfxJson(CANISTER_NAME);
        });

        it('should trigger low memory handler when memory limit is approached', async () => {
            await captureAssertionOutput(async () => {
                await fc.assert(
                    fc.asyncProperty(
                        fc.float({ min: 0, max: 1 }),
                        fc.integer({
                            min: 90 * 1024 * 1024, // 90 MiB in bytes (about the smallest size of an azle canister)
                            max: HARD_LIMIT
                        }),
                        async (
                            wasmMemoryThresholdPercentage,
                            wasmMemoryLimit
                        ) => {
                            // Calculate actual threshold based on percentage
                            const wasmMemoryThreshold =
                                wasmMemoryLimit * wasmMemoryThresholdPercentage;

                            await configureDfxJsonWasmMemorySettings(
                                CANISTER_NAME,
                                wasmMemoryThreshold,
                                wasmMemoryLimit
                            );

                            const actor =
                                await deployFreshCanister<Actor>(CANISTER_NAME);

                            await validateInitialStatus(actor, wasmMemoryLimit);

                            await addBytesUntilLimitReached(actor);

                            await validateFinalStatus(
                                actor,
                                wasmMemoryLimit,
                                wasmMemoryThreshold
                            );
                        }
                    ),
                    defaultPropTestParams()
                );
            });
        });
    };
}

/**
 * Adds random bytes to the canister until it reaches its memory limit
 * @param actor - The canister actor instance
 * @param canisterId - The canister's principal ID
 */
async function addBytesUntilLimitReached(actor: Actor): Promise<void> {
    let callCount = 0;

    while (true) {
        callCount++;

        // Get current status to make informed decision about next chunk size
        const status = getCanisterStatus(CANISTER_NAME);
        const remainingHardLimit = HARD_LIMIT - status.memorySize;

        if (remainingHardLimit <= 0) {
            break;
        }

        // Calculate the maximum possible chunk we can add without hitting hard limit
        const maxPossibleChunk = remainingHardLimit;

        // Start with an aggressive chunk size (up to 100MB) but ensure we don't exceed hard limit
        let targetChunkSize = Math.min(
            maxPossibleChunk,
            100 * 1024 * 1024 // 100MB cap
        );

        try {
            console.info(`Called addRandomBytes ${callCount} times`);
            await actor.addRandomBytes(targetChunkSize);
        } catch (error: unknown) {
            validateMemoryLimitError(error);
            break;
        }
    }
}

/**
 * Validates that the error received matches the expected memory limit error
 * @param error - The error object to validate
 */
function validateMemoryLimitError(error: unknown): void {
    const canisterId = getCanisterId('canister');
    expect(error).toMatchObject({
        name: 'AgentError',
        methodName: 'addRandomBytes',
        type: 'update',
        reject_code: 5,
        error_code: 'IC0539',
        canisterId: Principal.from(canisterId),
        reject_message: expect.stringMatching(
            new RegExp(
                `Error from Canister ${canisterId}: ` +
                    'Canister exceeded its current Wasm memory limit of \\d+ bytes\\. ' +
                    'The peak Wasm memory usage was \\d+ bytes\\. ' +
                    'If the canister reaches 4GiB, then it may stop functioning and may become unrecoverable\\. ' +
                    'Please reach out to the canister owner to investigate the reason for the increased memory usage\\. ' +
                    'It might be necessary to move data from the Wasm memory to the stable memory\\. ' +
                    'If such high Wasm memory usage is expected and safe, then the developer can increase the Wasm memory limit in the canister settings\\.\\.' +
                    '\\nTry checking the canister for a possible memory leak or modifying it to use more stable memory instead of Wasm memory\\. ' +
                    'See documentation: http://internetcomputer\\.org/docs/current/references/execution-errors#wasm-memory-limit-exceeded'
            )
        )
    });
}

/**
 * Validates the initial state of the canister:
 * - Confirms low memory handler has not been called
 * - Verifies wasm memory limit matches configured value
 * @param actor - The canister actor instance
 * @param wasmMemoryLimit - The configured wasm memory limit
 */
async function validateInitialStatus(
    actor: Actor,
    wasmMemoryLimit: number
): Promise<void> {
    const lowMemoryHandlerCalledAtBeginning =
        await actor.wasLowMemoryHandlerCalled();

    expect(lowMemoryHandlerCalledAtBeginning).toBe(false);

    const initialStatus = getCanisterStatus(CANISTER_NAME);
    expect(initialStatus.wasmMemoryLimit).toBe(wasmMemoryLimit);
}

/**
 * Validates the final state of the canister after memory operations:
 * - Verifies memory size exceeds (wasmMemoryLimit - wasmMemoryThreshold)
 * - Verifies memory size exceeds wasmMemoryLimit (current behavior)
 * - Confirms low memory handler was called
 * @param actor - The canister actor instance
 * @param wasmMemoryLimit - The configured wasm memory limit
 * @param wasmMemoryThreshold - The configured memory threshold
 */
async function validateFinalStatus(
    actor: Actor,
    wasmMemoryLimit: number,
    wasmMemoryThreshold: number
): Promise<void> {
    const finalStatus = getCanisterStatus(CANISTER_NAME);

    // This is the behavior I am expecting
    expect(finalStatus.memorySize).toBeGreaterThan(
        wasmMemoryLimit - wasmMemoryThreshold
    );
    // This is the behavior we are getting
    expect(finalStatus.memorySize).toBeGreaterThan(wasmMemoryLimit);

    const lowMemoryHandlerCalled = await actor.wasLowMemoryHandlerCalled();

    expect(lowMemoryHandlerCalled).toBe(true);
}
