import { IDL } from '@dfinity/candid';

/**
 * Attempts to grow the stable memory by `newPages`.
 * Supports 64-bit addressed memory.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stable64Grow(newPages: bigint): bigint {
    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64], [newPages])
    ).buffer;

    return IDL.decode(
        [IDL.Nat64],
        globalThis._azleIc.stable64Grow(newPagesCandidBytes)
    )[0];
}
