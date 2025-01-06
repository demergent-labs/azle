/**
 * Converts a Candid string into its binary representation.
 *
 * @param candidString - A valid Candid type string (e.g. "(nat8,bool)")
 * @returns The binary encoding as a Uint8Array, or empty array if called outside the IC environment
 *
 * @remarks
 * - Used for low-level Candid encoding operations
 * - Returns empty Uint8Array if called outside IC environment
 * - **Call Context**:
 *   - Any method
 *
 * @example
 * // Encode parameters for a raw call
 * const encoded = candidEncode("(text)");
 * await ic.call(canister.method, { raw: encoded });
 */
export function candidEncode(candidString: string): Uint8Array {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return new Uint8Array();
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(
            globalThis._azleIcExperimental.candidEncode(candidString)
        );
    }

    return globalThis._azleIcStable.candidEncode(candidString);
}
