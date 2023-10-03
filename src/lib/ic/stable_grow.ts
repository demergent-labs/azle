import { IDL } from '@dfinity/candid';

export function stableGrow(newPages) {
    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32], [newPages])
    ).buffer;

    return IDL.decode(
        [IDL.Nat32],
        globalThis._azleIc.stableGrow(newPagesCandidBytes)
    )[0];
}
