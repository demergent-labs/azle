/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): Uint8Array {
    return globalThis._azleIc
        ? new Uint8Array(globalThis._azleIc.argDataRaw())
        : (undefined as any);
}
