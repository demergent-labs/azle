import { IDL } from '@dfinity/candid';

/**
 * Reads data from the stable memory location specified by an offset
 * @param offset the location from which to read
 * @param length the length of buffer to read
 * @returns the raw bytes in stable memory
 */
export function stableRead(offset: number, buffer: number): Uint8Array {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32, IDL.Nat32], [offset, buffer])
    ).buffer;

    return new Uint8Array(globalThis._azleIc.stableRead(paramsCandidBytes));
}
