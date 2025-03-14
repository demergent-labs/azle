/**
 * Attempts to irrevocably remove the specified amount of cycles from the canister's balance.
 *
 * @param amount - The number of cycles to burn. Represented as a u128 (max size 2^128 - 1)
 *
 * @returns The number of cycles actually burned. Represented as a u128 (max size 2^128 - 1)
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
    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(
            globalThis._azleIcExperimental.cyclesBurn(amount.toString())
        );
    }

    if (globalThis._azleIcStable !== undefined) {
        return BigInt(globalThis._azleIcStable.cyclesBurn(amount.toString()));
    }

    return 0n;
}
