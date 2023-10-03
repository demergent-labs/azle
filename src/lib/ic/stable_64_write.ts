import { IDL } from '@dfinity/candid';

export function stable64Write(offset, buffer) {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64, IDL.Vec(IDL.Nat8)], [offset, buffer])
    ).buffer;

    return globalThis._azleIc.stable64Write(paramsCandidBytes);
}
