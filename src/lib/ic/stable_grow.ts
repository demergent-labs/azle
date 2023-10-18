import { nat32 } from '../candid/types/primitive/nats/nat32';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';

/**
 * Attempts to grow the stable memory by `newPages`.
 * @param newPages
 * @returns the previous size that was reserved.
 */
export function stableGrow(newPages: nat32): nat32 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const newPagesCandidBytes = encode(nat32, newPages).buffer;

    return decode(
        nat32,
        globalThis._azleIc.stableGrow(newPagesCandidBytes)
    ) as number;
}
