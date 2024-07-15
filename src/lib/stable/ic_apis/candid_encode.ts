/**
 * Converts a Candid string into bytes
 * @param candidString a valid Candid string
 * @returns the candid value as bytes
 */
export function candidEncode(candidString: string): Uint8Array {
    return new Uint8Array(
        globalThis._azleIc ? globalThis._azleIc.candidEncode(candidString) : []
    );
}
