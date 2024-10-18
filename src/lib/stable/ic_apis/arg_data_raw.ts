/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): Uint8Array {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return new Uint8Array();
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(globalThis._azleIcExperimental.argDataRaw());
    }

    return globalThis._azleIcStable.argDataRaw();
}
