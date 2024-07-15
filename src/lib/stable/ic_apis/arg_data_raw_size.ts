/**
 * Gets the length of the raw-argument-data-bytes
 * @returns the data size
 */
export function argDataRawSize(): number {
    return globalThis._azleIc ? Number(globalThis._azleIc.argDataRawSize()) : 0;
}
