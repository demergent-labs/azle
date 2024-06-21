/**
 * Reads data from the stable memory location specified by an offset.
 * Supports 64-bit addressed memory.
 * @param offset the location from which to read
 * @param length the length of buffer to read
 * @returns the raw bytes in stable memory
 */
export function stable64Read(offset: bigint, length: bigint): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return new Uint8Array(
        globalThis._azleIc.stable64Read(offset.toString(), length.toString())
    );
}
