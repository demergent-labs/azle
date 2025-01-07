/**
 * Converts binary Candid data into its string representation.
 *
 * @param candidBytes - The binary Candid data to decode
 * @returns The decoded Candid type string, or empty string if called outside the IC environment
 *
 * @remarks
 * - **Call Context**:
 *   - Any method
 */
export function candidDecode(candidBytes: Uint8Array): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.candidDecode(candidBytes.buffer);
    }

    return globalThis._azleIcStable.candidDecode(candidBytes);
}
