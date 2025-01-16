/**
 * Returns the amount of cycles that were refunded from the last inter-canister call.
 *
 * @returns The amount of cycles refunded
 *
 * @remarks
 *
 * - Can only be called after an inter-canister await
 * - All unaccepted cycles transferred with an inter-canister call are automatically refunded to the calling canister at the end of the call
 *
 * - **Call Context**:
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
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
