/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): bigint {
    if (globalThis._azleIcStable === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIcStable.canisterBalance());
}
