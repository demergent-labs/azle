import { IDL } from '@dfinity/candid';
import { nat32 } from '../candid/types/primitive/nats/nat32';

/**
 * Attempts to grow the stable memory by `newPages`.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stableGrow(newPages: nat32): nat32 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const newPagesCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32], [newPages])
    ).buffer;

    return IDL.decode(
        [IDL.Nat32],
        globalThis._azleIc.stableGrow(newPagesCandidBytes)
    )[0] as number;
}
