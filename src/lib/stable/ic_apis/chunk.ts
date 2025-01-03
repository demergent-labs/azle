import { call } from './call';
import { candidEncode } from './candid_encode';
import { id } from './id';

/**
 * Resets the instruction limit by performing a self-call to the canister.
 * Used to handle computationally intensive operations that would otherwise exceed instruction limits.
 *
 * @returns Promise<void>, or no effect if called outside the IC environment
 *
 * @example
 * // Process large dataset in chunks
 * for (let i = 0; i < numberOfChunks; i++) {
 *     doPartOfHeavyComputation();
 *     await chunk();
 * }
 *
 * @remarks
 * - Only works in:
 *   - Update calls and their reply/reject callbacks
 *   - Timers
 *   - Heartbeat methods
 * - Makes a cross-canister call to self, so state management across await points is important
 * - Current instruction limits are ~40B for update calls
 * - See: https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits
 */
export async function chunk(): Promise<void> {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    await call(id(), '_azle_chunk', { raw: candidEncode('()'), cycles: 0n });
}
