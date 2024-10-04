import '../experimental';

import { blob } from '../candid/types/constructed/blob';

/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): blob {
    return globalThis._azleIc
        ? globalThis._azleIc.argDataRaw()
        : new Uint8Array();
}
