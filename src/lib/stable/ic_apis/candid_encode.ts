/**
 * Converts a Candid string into bytes
 * @param candidString a valid Candid string
 * @returns the candid value as bytes
 */
export function candidEncode(candidString: string): Uint8Array {
    if (globalThis._azleIc === undefined) {
        return new Uint8Array();
    }

    return globalThis._azleIc.candidEncode(candidString);
}
