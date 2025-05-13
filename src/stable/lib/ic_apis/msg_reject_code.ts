/**
 * Returns the reject code from the most recently executed inter-canister call.
 *
 * @returns The reject code as a number
 *
 * @remarks
 *
 * The currently supported reject codes are:
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
 *   6: SysUnknown
 *
 * - **Call Context**:
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 */
export function msgRejectCode(): number {
    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.msgRejectCode();
    }

    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.msgRejectCode();
    }

    return 6;
}
