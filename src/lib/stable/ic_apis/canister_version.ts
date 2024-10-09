/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): bigint {
    if (globalThis._azleIcStable === undefined) {
        return 0n;
    }

    return globalThis._azleIcStable.canisterVersion();
}
