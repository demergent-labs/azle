import { IDL } from '@dfinity/candid';

/**
 * Attempts to grow the stable memory by `newPages`.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stableGrow(newPages: number): number {
    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32], [newPages])
    ).buffer;

    return IDL.decode(
        [IDL.Nat32],
        globalThis._azleIc.stableGrow(newPagesCandidBytes)
    )[0];
}
