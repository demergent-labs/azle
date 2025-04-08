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
    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.candidDecode(
            candidBytes.buffer instanceof ArrayBuffer
                ? candidBytes.buffer
                : new Uint8Array(candidBytes).buffer
        );
    }

    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.candidDecode(candidBytes);
    }

    return '';
}
