/**
 * Attempts to irrevocably remove the specified amount of cycles from the canister's balance.
 *
 * @param amount - The number of cycles to burn. Maximum value is 2^128 - 1 (u128)
 *
 * @returns The number of cycles actually burned
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@preUpgrade
 *   - \@update
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
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
