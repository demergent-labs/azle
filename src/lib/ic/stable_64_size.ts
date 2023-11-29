import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Gets current size of the stable memory (in WASM pages). Supports 64-bit
 * addressed memory.
 * @returns the current memory size
 */
export function stable64Size(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return BigInt(globalThis._azleIc.stable64Size());
}
