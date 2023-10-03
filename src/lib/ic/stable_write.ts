import { IDL } from '@dfinity/candid';
import { nat32 } from '../candid/types/primitive/nats/nat32';
import { blob } from '../candid/types/constructed/blob';

/**
 * Writes data to the stable memory location specified by an offset
 *
 * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
 * current size of stable memory. Use {@link ic.stableGrow} to request more
 * stable memory if needed.
 * @param offset the location at which to write
 * @param buffer the data to write
 */
export function stableWrite(offset: nat32, buffer: blob): void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32, IDL.Vec(IDL.Nat8)], [offset, buffer])
    ).buffer;

    return globalThis._azleIc.stableWrite(paramsCandidBytes);
}
