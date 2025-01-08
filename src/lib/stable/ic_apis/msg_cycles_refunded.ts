/**
 * Returns the amount of cycles that were refunded from the last cross-canister call.
 *
 * @returns The amount of cycles refunded from the last call, or 0n if called outside the IC environment
 *
 * @remarks
 * - Refunded cycles are already added to canister balance
 * - **Call Context**:
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function msgCyclesRefunded(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.msgCyclesRefunded());
    }

    return BigInt(globalThis._azleIcStable.msgCyclesRefunded());
}
