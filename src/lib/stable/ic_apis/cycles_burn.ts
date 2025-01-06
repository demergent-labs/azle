/**
 * Burns the specified amount of cycles from the canister's balance.
 *
 * @param amount - The number of cycles to burn
 * @returns The number of cycles actually burned, or 0n if called outside the IC environment
 *
 * @remarks
 * - Cannot burn more cycles than the canister has available
 * - Useful for testing cycle limits or implementing cycle burning mechanics
 * - Returns 0n if called outside the IC environment
 * - **Call Context**:
 *   - init
 *   - preUpgrade
 *   - update
 *   - reply
 *   - heartbeat
 *   - global_timer
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
