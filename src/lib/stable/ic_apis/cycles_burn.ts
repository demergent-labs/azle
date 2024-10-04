/**
 * Burns cycles from the canister
 * @returns the amount of cycles that were actually burned
 */
export function cyclesBurn(amount: bigint): bigint {
    if (globalThis._azleIcStable === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIcStable.cyclesBurn(amount.toString()));
}
