/**
 * Converts a Candid string into bytes
 * @param candidString a valid Candid string
 * @returns the candid value as bytes
 */
export function candidEncode(candidString: string): Uint8Array {
    if (globalThis._azleIcStable === undefined) {
        return new Uint8Array();
    }

    return globalThis._azleIcStable.candidEncode(candidString);
}
