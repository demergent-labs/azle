/**
 * Moves cycles from the current call's available cycles to the canister's balance.
 *
 * @param maxAmount - Maximum number of cycles to accept from the available cycles
 * @returns The actual amount of cycles accepted, which may be less than maxAmount if fewer cycles were available, or 0n if called outside the IC environment
 *
 * @remarks
 * - Cannot accept more cycles than are available in the current call
 * - **Call Context**:
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 */
export function msgCyclesAccept(maxAmount: bigint): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.msgCyclesAccept(maxAmount.toString())
        );
    }

    return BigInt(
        globalThis._azleIcStable.msgCyclesAccept(maxAmount.toString())
    );
}
