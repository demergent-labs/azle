import { IDL } from '@dfinity/candid';

export function stableWrite(offset, buffer) {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32, IDL.Vec(IDL.Nat8)], [offset, buffer])
    ).buffer;

    return globalThis._azleIc.stableWrite(paramsCandidBytes);
}
