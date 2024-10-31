/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.canisterBalance());
    }

    return BigInt(globalThis._azleIcStable.canisterBalance());
}
