import { call } from './call';
import { candidEncode } from './candid_encode';
import { id } from './id';

/**
 * Resets the instruction limit to allow continuation of computationally intensive operations.
 *
 * @returns Promise<void>, or no effect if called outside the IC environment
 *
 * @remarks
 * - Makes a cross-canister call to self, so state management across await points is important
 * - Current instruction limits are ~40B for update calls
 * - See: https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits
 * - **Call Context**:
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - heartbeat
 *   - timer
 * - **When called outside of Call Context**:
 *   - Throws
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
