/**
 * Rejects the current call with a message.
 *
 * @param message - The rejection message
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Used in canister methods marked with { manual: true }
 * - Stops execution and rejects the current call
 * - Traps if called outside valid context
 * - **Call Context**:
 *   - update
 *   - query
 *   - composite query
 *   - reply
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
