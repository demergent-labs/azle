import { nat32 } from '../candid/types/primitive/nats/nat32';
import { encode } from '../candid/serde/encode';

/**
 * Reads data from the stable memory location specified by an offset
 * @param offset the location from which to read
 * @param length the length of buffer to read
 * @returns the raw bytes in stable memory
 */
export function stableRead(offset: nat32, length: nat32): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const paramsCandidBytes = encode([nat32, nat32], [offset, length]).buffer;

    return new Uint8Array(globalThis._azleIc.stableRead(paramsCandidBytes));
}
