/**
 * Converts a candid value into a Candid string
 * @param candidEncoded a raw Candid value
 * @returns the Candid string
 */
export function candidDecode(candidEncoded: Uint8Array): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.candidDecode(
            candidEncoded.buffer
        );
    }

    return globalThis._azleIcStable.candidDecode(candidEncoded);
}
