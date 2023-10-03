import { IDL } from '@dfinity/candid';

export function stable64Grow(newPages) {
    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64], [newPages])
    ).buffer;

    return IDL.decode(
        [IDL.Nat64],
        globalThis._azleIc.stable64Grow(newPagesCandidBytes)
    )[0];
}
