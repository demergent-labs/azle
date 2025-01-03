/**
 * Burns cycles from this canister's balance.
 *
 * @param amount - The amount of cycles to burn
 * @returns The actual amount of cycles burned, or 0n if called outside the IC environment
 *
 * @remarks
 * - Cannot burn more cycles than the canister has available
 * - Useful for testing cycle limits or implementing cycle burning mechanics
 * - Returns 0n if called outside the IC environment
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
