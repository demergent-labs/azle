/**
 * Rejects the current call with a message.
 *
 * @param message - The rejection message
 * @returns void
 *
 * @remarks
 * - Used in canister methods marked with { manual: true }
 *
 * - **Call Context**:
 *   - \@update
 *   - \@query, replicated and non-replicated
 *   - \@query(..., { composite: true })
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 *
 * - **Outside of Call Context**:
 *   - traps
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
