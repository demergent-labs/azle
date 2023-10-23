import { nat32 } from '../candid/types/primitive/nats/nat32';
import { decode } from '../candid/serde/decode';

/**
 * Gets current size of the stable memory (in WASM pages)
 * @returns the current memory size
 */
export function stableSize(): nat32 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return decode(nat32, globalThis._azleIc.stableSize()) as number;
}
