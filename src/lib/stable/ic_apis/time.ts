/**
 * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
 * @returns the current timestamp
 */
export function time(): bigint {
    if (globalThis._azleIcStable === undefined) {
        return 0n;
    }

    return globalThis._azleIcStable.time();
}
