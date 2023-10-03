import { blob } from '../candid/types/constructed/blob';

/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): blob {
    return globalThis._azleIc
        ? new Uint8Array(globalThis._azleIc.argDataRaw())
        : (undefined as any);
}
