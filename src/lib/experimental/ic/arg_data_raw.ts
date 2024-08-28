import '../experimental';

import { blob } from '../candid/types/constructed/blob';

/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): blob {
    return new Uint8Array(
        globalThis._azleIc ? globalThis._azleIc.argDataRaw() : []
    );
}
