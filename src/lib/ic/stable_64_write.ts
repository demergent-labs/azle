import { IDL } from '@dfinity/candid';
import { blob } from '../candid/types/constructed/blob';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Writes data to the stable memory location specified by an offset.
 * Supports 64-bit addressed memory.
 *
 * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
 * current size of stable memory. Use {@link ic.stable64Grow} to request
 * more stable memory if needed.
 * @param offset the location at which to write
 * @param buffer the data to write
 */
export function stable64Write(offset: nat64, buffer: blob): void {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64, IDL.Vec(IDL.Nat8)], [offset, buffer])
    ).buffer;

    return globalThis._azleIc.stable64Write(paramsCandidBytes);
}
