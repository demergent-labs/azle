import { IDL } from '@dfinity/candid';

export function stable64Read(offset, buffer) {
    const paramsCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64, IDL.Nat64], [offset, buffer])
    ).buffer;

    return new Uint8Array(globalThis._azleIc.stable64Read(paramsCandidBytes));
}
