/**
 * Code associated with an unsuccessful inter-canister call.
 *
 * Reject codes:
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
 *   6: SysUnknown
 */
export type RejectCode = 1 | 2 | 3 | 4 | 5 | 6;
// TODO we need clarification, it looks like msgRejectCode returns 0 still
// TODO but the Rust RejectCode enum omits 0...
// TODO once we figure out if 0 is valid, we should probably add it back in here

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
