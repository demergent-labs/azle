/**
 * Returns the rejection message from the last failed cross-canister call.
 *
 * @returns The rejection message
 *
 * @remarks
 * - Will trap if there is no reject message available
 * - Always check `rejectCode` before calling this function
 *
 * - **Call Context**:
 *   - after an unsuccessful inter-canister await
 *   - after an unsuccessful inter-canister await from a composite query
 *
 * - **Outside of Call Context**:
 *   - traps
 */
export function rejectMessage(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.rejectMessage();
    }

    return globalThis._azleIcStable.rejectMessage();
}
