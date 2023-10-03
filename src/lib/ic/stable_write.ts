import { IDL } from '@dfinity/candid';

/**
 * Writes data to the stable memory location specified by an offset
 *
 * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
 * current size of stable memory. Use {@link ic.stableGrow} to request more
 * stable memory if needed.
 * @param offset the location at which to write
 * @param buffer the data to write
 */
export function stableWrite(offset: number, buffer: Uint8Array): void {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32, IDL.Vec(IDL.Nat8)], [offset, buffer])
    ).buffer;

    return globalThis._azleIc.stableWrite(paramsCandidBytes);
}
