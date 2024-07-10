import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Gets current size of the stable memory (in WASM pages)
 * Supports 64-bit addressed memory.
 * @returns the current memory size
 */
export function stableSize(): nat64 {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.stableSize());
}
