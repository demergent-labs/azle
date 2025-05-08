import { Principal } from 'azle';
import { getCanisterId } from 'azle/_internal/dfx';
import { defaultPropTestParams, expect, it, Test } from 'azle/_internal/test';
import fc from 'fast-check';

import { deployFreshCanister, getCanisterStatus } from './dfx';
import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

const HARD_LIMIT = 3.5 * 1024 * 1024 * 1024; // 3.5 GiB in bytes (We can't use 4 GiB because we need enough memory to successfully finish a call)
const CANISTER_NAME = 'canister';

export function getTests(): Test {
    return () => {
        it('should trigger low memory handler when memory limit is approached', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.integer({ min: 0, max: 99 }),
                    fc.integer({
                        min: 90 * 1024 * 1024, // 90 MiB in bytes (about the smallest size of this azle canister)
                        max: HARD_LIMIT
                    }),
                    async (wasmMemoryThresholdPercentage, wasmMemoryLimit) => {
                        // eslint-disable-next-line no-param-reassign
                        wasmMemoryThresholdPercentage = 0; // TODO remove after https://github.com/demergent-labs/azle/issues/2613 is resolved
                        // Calculate actual threshold based on percentage
                        const wasmMemoryThreshold = Math.floor(
                            wasmMemoryLimit *
                                (wasmMemoryThresholdPercentage / 100)
                        );

                        const actor = await deployFreshCanister<Actor>(
                            CANISTER_NAME,
                            wasmMemoryThreshold,
                            wasmMemoryLimit
                        );

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
    };
}

/**
 * Validates the initial state of the canister:
 * - Confirms low memory handler has not been called
 * - Verifies Wasm memory limit matches configured value
 *
 * @param actor - The canister actor instance
 * @param wasmMemoryLimit - The configured Wasm memory limit
 */
async function validateInitialStatus(
    actor: Actor,
    wasmMemoryLimit: number
): Promise<void> {
    const lowMemoryHandlerCalledAtBeginning =
        await actor.getOnLowWasmMemoryCalled();

    expect(lowMemoryHandlerCalledAtBeginning).toBe(false);

    const initialStatus = getCanisterStatus(CANISTER_NAME);
    expect(initialStatus.wasmMemoryLimit).toBe(wasmMemoryLimit);
}

/**
 * Adds random bytes to the canister until it reaches its memory limit
 *
 * @param actor - The canister actor instance
 * @param canisterId - The canister's principal ID
 */
async function addBytesUntilLimitReached(actor: Actor): Promise<void> {
    let callCount = 0;

    while (true) {
        callCount++;

        // Get current status to make informed decision about next chunk size
        const status = getCanisterStatus(CANISTER_NAME);
        const maxPossibleChunk = HARD_LIMIT - status.memorySize;

        if (maxPossibleChunk <= 0) {
            break;
        }

        // 100MiBs is a good general purpose chunk size. The biggest canisters
        // fill up in less than 20 calls (less than 1 minute). Large chunks are
        // more likely to run out of memory in the middle of the call.
        const targetChunkSize = Math.min(maxPossibleChunk, 100 * 1024 * 1024);

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
 *
 * @param error - The error object to validate
 */
function validateMemoryLimitError(error: unknown): void {
    const canisterId = getCanisterId(CANISTER_NAME);
    expect(error).toMatchObject({
        name: 'AgentError',
        methodName: 'addRandomBytes',
        type: 'update',
        reject_code: 5,
        error_code: 'IC0539',
        canisterId: Principal.from(canisterId),
        reject_message: expect.stringMatching(
            new RegExp(
                `Error from Canister ${canisterId}: Canister exceeded its current Wasm memory limit of \\d+ bytes`
            )
        )
    });
}

/**
 * Validates the final state of the canister after memory operations:
 * - Verifies memory size exceeds (wasmMemoryLimit - wasmMemoryThreshold)
 * - Verifies memory size exceeds wasmMemoryLimit (current behavior)
 * - Confirms low memory handler was called
 *
 * @param actor - The canister actor instance
 * @param wasmMemoryLimit - The configured Wasm memory limit
 * @param wasmMemoryThreshold - The configured memory threshold
 */
async function validateFinalStatus(
    actor: Actor,
    wasmMemoryLimit: number,
    wasmMemoryThreshold: number
): Promise<void> {
    const finalStatus = getCanisterStatus(CANISTER_NAME);

    expect(finalStatus.memorySize).toBeGreaterThanOrEqual(
        wasmMemoryLimit - wasmMemoryThreshold
    );
    // TODO: Add this check when wasmMemoryThreshold is supported on the IC: https://forum.dfinity.org/t/how-to-verify-wasm-memory-threshold-is-set-correctly/40670
    // expect(finalStatus.memorySize).toBeLessThan(wasmMemoryLimit);
    // TODO: Remove this check when wasmMemoryThreshold is supported on the IC: https://forum.dfinity.org/t/how-to-verify-wasm-memory-threshold-is-set-correctly/40670
    expect(finalStatus.memorySize).toBeGreaterThan(wasmMemoryLimit);

    const lowMemoryHandlerCalled = await actor.getOnLowWasmMemoryCalled();

    expect(lowMemoryHandlerCalled).toBe(true);
}
