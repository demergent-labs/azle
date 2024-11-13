import '../experimental';

import { blob } from '../candid/types/constructed/blob';

/**
 * Returns the argument data as bytes.
 * @returns the argument data
 */
export function argDataRaw(): blob {
    if (globalThis._azleIcExperimental === undefined) {
        return new Uint8Array();
    }

    return new Uint8Array(globalThis._azleIcExperimental.argDataRaw());
}
