export type RejectCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
export function msgRejectCode(): RejectCode {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 6;
    }

    return globalThis._azleIcExperimental !== undefined
        ? globalThis._azleIcExperimental.msgRejectCode()
        : globalThis._azleIcStable.msgRejectCode();
}
