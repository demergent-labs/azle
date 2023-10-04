import { nat32 } from '../candid/types/primitive/nats/nat32';

/**
 * Gets the length of the raw-argument-data-bytes
 * @returns the data size
 */
export function argDataRawSize(): nat32 {
    return globalThis._azleIc
        ? globalThis._azleIc.argDataRawSize()
        : (undefined as any);
}
