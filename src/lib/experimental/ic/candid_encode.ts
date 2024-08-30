import '../experimental';

import { blob } from '../candid/types/constructed/blob';
import { text } from '../candid/types/primitive/text';

/**
 * Converts a Candid string into bytes
 * @param candidString a valid Candid string
 * @returns the candid value as bytes
 */
export function candidEncode(candidString: text): blob {
    return new Uint8Array(
        globalThis._azleIc ? globalThis._azleIc.candidEncode(candidString) : []
    );
}
