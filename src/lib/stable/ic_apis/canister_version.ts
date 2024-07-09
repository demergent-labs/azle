/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): bigint {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return BigInt(globalThis._azleIc.canisterVersion());
}
