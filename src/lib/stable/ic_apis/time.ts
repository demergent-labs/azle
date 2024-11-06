/**
 * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
 * @returns the current timestamp
 */
export function time(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.time());
    }

    return BigInt(globalThis._azleIcStable.time());
}
