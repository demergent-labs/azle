/**
 * Decodes binary Candid value bytes into its string representation.
 *
 * @param candidBytes - The binary Candid value bytes to decode
 * @returns The decoded Candid value string
 *
 * @remarks
 *
 * - **Call Context**:
 *   - any
 */
export function candidDecode(candidBytes: Uint8Array): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.candidDecode(candidBytes);
    }

    return globalThis._azleIcStable.candidDecode(candidBytes);
}
