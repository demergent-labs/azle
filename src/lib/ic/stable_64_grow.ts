import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';

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

    const newPagesCandidBytes = encode(nat64, newPages).buffer;

    return decode(nat64, globalThis._azleIc.stable64Grow(newPagesCandidBytes));
}
