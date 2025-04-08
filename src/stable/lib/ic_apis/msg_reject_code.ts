/**
 * Code associated with an unsuccessful inter-canister call.
 *
 * Reject codes:
 *
 *   0: NoError
 *
 *   1: SysFatal
 *
 *   2: SysTransient
 *
 *   3: DestinationInvalid
 *
 *   4: CanisterReject
 *
 *   5: CanisterError
 *
 *   6: Unknown
 */
export type RejectCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Returns the reject code from the most recently executed inter-canister call.
 *
 * @returns The reject code as a number between 0 and 6 inclusive
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
    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.msgRejectCode();
    }

    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.msgRejectCode();
    }

    return 6;
}
