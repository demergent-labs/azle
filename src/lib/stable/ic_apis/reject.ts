/**
 * Rejects the current call with a message.
 *
 * @param message - The reject message
 * @returns void
 *
 * @remarks
 *
 * - Produces reject code `CanisterReject (4)`
 *
 * - **Call Context**:
 *   - \@update(..., { manual: true })
 *   - \@query(..., { manual: true }), replicated and non-replicated
 *   - \@query(..., { composite: true, manual: true })
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
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
