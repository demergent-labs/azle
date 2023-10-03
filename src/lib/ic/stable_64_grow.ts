import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Attempts to grow the stable memory by `newPages`.
 * Supports 64-bit addressed memory.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stable64Grow(newPages: nat64): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64], [newPages])
    ).buffer;

    return BigInt(
        IDL.decode(
            [IDL.Nat64],
            globalThis._azleIc.stable64Grow(newPagesCandidBytes)
        )[0] as number
    );
}
