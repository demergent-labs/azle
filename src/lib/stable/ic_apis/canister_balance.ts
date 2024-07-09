/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): bigint {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return BigInt(globalThis._azleIc.canisterBalance());
}
