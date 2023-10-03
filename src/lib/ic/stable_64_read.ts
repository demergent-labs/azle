import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Reads data from the stable memory location specified by an offset.
 * Supports 64-bit addressed memory.
 * @param offset the location from which to read
 * @param length the length of buffer to read
 * @returns the raw bytes in stable memory
 */
export function stable64Read(offset: nat64, length: nat64): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64, IDL.Nat64], [offset, length])
    ).buffer;

    return new Uint8Array(globalThis._azleIc.stable64Read(paramsCandidBytes));
}
