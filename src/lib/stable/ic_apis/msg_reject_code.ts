/**
 * Returns the reject code from the most recently executed inter-canister call.
 *
 * @returns The reject code. Represented as a number between 0 and 6 inclusive
 *
 * @remarks
 *
 * - **Call Context**:
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 */
export function msgRejectCode(): number {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 10_000; // 10_000 is an arbitrary number that is unlikely to ever be used by the IC
    }

    return globalThis._azleIcExperimental !== undefined
        ? Number(globalThis._azleIcExperimental.msgRejectCode())
        : globalThis._azleIcStable.msgRejectCode();
}
