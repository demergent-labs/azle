/**
 * Rejects the current call with a message.
 *
 * @param message - The rejection message
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Used in canister methods marked with { manual: true }
 * - **Call Context**:
 *   - update
 *   - query (replicated and non-replicated)
 *   - composite query
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - after a cross-canister call from a composite query
 *   - after a rejected cross-canister call from a composite query
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function reject(message: string): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.reject(message);
        return;
    }

    globalThis._azleIcStable.reject(message);
}
