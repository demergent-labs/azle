import { Principal } from 'azle';
import { getCanisterId } from 'azle/dfx';
import {
    captureAssertionOutput,
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';
import {
    configureDfxJsonWasmMemorySettings,
    getCanisterStatus,
    resetDfxJson
} from './helpers/dfx';

export function getTests(): Test {
    return () => {
        it('should trigger low memory handler when memory limit is approached', async () => {
            await captureAssertionOutput(async () => {
                await fc.assert(
                    fc.asyncProperty(
                        fc.float({ min: 0, max: 1 }),
                        fc.integer({
                            // min: 90 * 1024 * 1024, // 90 MiB in bytes (about the smallest size of an azle canister)
                            min: 3 * 1024 * 1024 * 1024, // 90 MiB in bytes (about the smallest size of an azle canister)
                            max: 4 * 1024 * 1024 * 1024 // 4GiB in bytes (the largest size of an azle canister)
                        }),
                        async (
                            wasmMemoryThresholdPercentage,
                            wasmMemoryLimit
                        ) => {
                            // Calculate actual threshold based on percentage
                            const wasmMemoryThreshold =
                                wasmMemoryLimit * wasmMemoryThresholdPercentage;

                            await configureDfxJsonWasmMemorySettings(
                                wasmMemoryThreshold,
                                wasmMemoryLimit
                            );

                            execSync(`dfx canister stop canister || true`, {
                                stdio: 'inherit'
                            });

                            execSync(`dfx canister delete canister || true`, {
                                stdio: 'inherit'
                            });
                            execSync(`dfx deploy --no-wallet`, {
                                stdio: 'inherit'
                            });
                            execSync(`dfx generate canister`, {
                                stdio: 'inherit'
                            });

                            const canisterId = getCanisterId('canister');
                            const actor =
                                await getCanisterActor<Actor>('canister');

                            // Get initial status
                            const initialStatus = getCanisterStatus();
                            console.log(
                                'Initial canister status:',
                                initialStatus
                            );

                            await addBytesUntilLimitReached(actor, canisterId);

                            // Get final status
                            const finalStatus = getCanisterStatus();
                            console.log('Final canister status:', finalStatus);

                            const lowMemoryHandlerCalled =
                                await actor.wasLowMemoryHandlerCalled();
                            expect(lowMemoryHandlerCalled).toBe(true);

                            await resetDfxJson();
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
async function addBytesUntilLimitReached(
    actor: Actor,
    canisterId: string
): Promise<void> {
    let callCount = 0;
    const HARD_LIMIT = 4 * 1024 * 1024 * 1024; // 4 GiB in bytes

    while (true) {
        callCount++;
        console.log(`Called addRandomBytes ${callCount} times`); // TODO don't forget to remove this before the pr

        // Get current status to make informed decision about next chunk size
        const status = getCanisterStatus();
        const remainingToSoftLimit = status.wasmMemoryLimit - status.memorySize;
        const remainingToHardLimit = HARD_LIMIT - status.memorySize;

        // If we're already over the soft limit, we're done
        if (remainingToSoftLimit <= 0) {
            break;
        }

        // If we're close to the hard limit, stop to prevent IC0503
        if (remainingToHardLimit < 1024 * 1024) {
            // Less than 1MB remaining
            break;
        }

        // Target going slightly over the soft limit in the next 2-3 calls
        // but never exceeding the hard limit
        const targetChunkSize = Math.min(
            Math.floor(remainingToSoftLimit / 8), // More gradual increase
            Math.floor(remainingToHardLimit / 16), // More conservative with hard limit
            100 * 1024 * 1024 // Cap at 100MB per chunk to avoid instruction limits
        );

        try {
            await actor.addRandomBytes(targetChunkSize);
        } catch (error: unknown) {
            validateMemoryLimitError(error, canisterId);
            break;
        }
    }

    console.info(`Called addRandomBytes ${callCount} times`);
}

/**
 * Validates that the error received matches the expected memory limit error
 * @param error - The error object to validate
 * @param canisterId - The canister's principal ID
 */
function validateMemoryLimitError(error: unknown, canisterId: string): void {
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
