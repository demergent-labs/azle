/**
 * Returns the raw argument data passed to the current method call.
 * Used for low-level access to method parameters before Candid decoding.
 *
 * @returns The raw argument bytes as Uint8Array, or empty array if called outside the IC environment
 *
 * @remarks
 * - Returns the raw bytes before any Candid decoding
 * - Useful for custom argument parsing or debugging
 * - Commonly used in inspect_message handlers
 * - Returns empty Uint8Array if called outside IC environment
 *
 * @example
 * // In an inspect_message handler
 * function inspectMessage(): boolean {
 *     const args = argDataRaw();
 *     // Inspect raw argument bytes
 *     return true;
 * }
 */
export function argDataRaw(): Uint8Array {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return new Uint8Array();
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(globalThis._azleIcExperimental.argDataRaw());
    }

    return globalThis._azleIcStable.argDataRaw();
}
