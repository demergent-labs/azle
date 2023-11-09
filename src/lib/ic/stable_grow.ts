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

    return Number(globalThis._azleIc.stableGrow(newPages.toString()));
}
