/**
 * Burns the specified amount of cycles from the canister's balance.
 *
 * @param amount - The number of cycles to burn
 * @returns The number of cycles actually burned, or 0n if called outside the IC environment
 *
 * @remarks
 * - Cannot burn more cycles than the canister has available
 * - **Call Context**:
 *   - init
 *   - postUpgrade
 *   - preUpgrade
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - heartbeat
 *   - timer
 *   - Note: Also cleanupCallback
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function cyclesBurn(amount: bigint): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.cyclesBurn(amount.toString())
        );
    }

    return BigInt(globalThis._azleIcStable.cyclesBurn(amount.toString()));
}
