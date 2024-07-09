import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Reads data from the stable memory location specified by an offset
 * @param offset the location from which to read
 * @param length the length of buffer to read
 * @returns the raw bytes in stable memory
 */
export function stableRead(offset: nat64, length: nat64): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return new Uint8Array(
        globalThis._azleIc.stableRead(offset.toString(), length.toString())
    );
}
