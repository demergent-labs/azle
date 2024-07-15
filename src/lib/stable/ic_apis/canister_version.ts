/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.canisterVersion());
}
