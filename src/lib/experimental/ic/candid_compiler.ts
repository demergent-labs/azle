import '../experimental';

import { text } from '../candid/types/primitive/text';

/**
 * Converts a Candid string into its corresponding IDL as a string
 * @param candidString a valid Candid string
 * @returns the IDL string
 */
export function candidCompiler(candidPath: text): string {
    if (globalThis._azleIcExperimental === undefined) {
        return '';
    }

    return globalThis._azleIcExperimental.candidCompiler(candidPath);
}
