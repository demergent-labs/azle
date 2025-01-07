/**
 * Returns the amount of cycles that were refunded from the last cross-canister call.
 *
 * @returns The amount of cycles refunded from the last call, or 0n if called outside the IC environment
 *
 * @remarks
 * - Only meaningful after a cross-canister call
 * - Refunded cycles are already added to canister balance
 * - **Call Context**:
 *   - reply callback
 *   - reject callback
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
