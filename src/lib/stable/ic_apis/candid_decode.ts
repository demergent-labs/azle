/**
 * Converts a candid value into a Candid string
 * @param candidEncoded a raw Candid value
 * @returns the Candid string
 */
export function candidDecode(candidEncoded: Uint8Array): string {
    if (globalThis._azleIc === undefined) {
        return '';
    }

    return globalThis._azleIc.candidDecode(candidEncoded.buffer);
}
