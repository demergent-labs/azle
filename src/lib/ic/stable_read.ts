import { IDL } from '@dfinity/candid';

export function stableRead(offset: number, buffer: number): Uint8Array {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32, IDL.Nat32], [offset, buffer])
    ).buffer;

    return new Uint8Array(globalThis._azleIc.stableRead(paramsCandidBytes));
}
