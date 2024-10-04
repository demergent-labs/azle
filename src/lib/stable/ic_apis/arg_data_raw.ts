/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return new Uint8Array();
    }

    return globalThis._azleIc.argDataRaw();
}
