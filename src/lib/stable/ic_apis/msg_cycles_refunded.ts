/**
 * Returns the amount of cycles that were refunded from the last cross-canister call.
 * The refund is automatically added to the canister's balance.
 *
 * @returns The amount of cycles refunded from the last call
 *
 * @example
 * await ic.call(otherCanister.method, { cycles: 1_000_000n });
 * const refunded = msgCyclesRefunded();
 *
 * @remarks
 * - Returns 0n if called outside the IC environment
 * - Only meaningful after a cross-canister call
 * - Refunded cycles are already added to canister balance
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
