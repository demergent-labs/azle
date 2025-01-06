/**
 * Converts binary Candid data into its string representation.
 *
 * @param candidBytes - The binary Candid data to decode
 * @returns The decoded Candid type string, or empty string if called outside the IC environment
 *
 * @remarks
 * - Used for low-level Candid decoding operations
 * - Common in raw calls and manual message handling
 * - Returns empty string if called outside IC environment
 * - **Call Context**:
 *   - Any method
 *
 * @example
 * // Decode raw response from a call
 * const response = await ic.call(canister.method);
 * const decoded = candidDecode(response.raw);
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
