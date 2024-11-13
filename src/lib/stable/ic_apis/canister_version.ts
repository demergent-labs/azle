/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.canisterVersion());
    }

    return BigInt(globalThis._azleIcStable.canisterVersion());
}
