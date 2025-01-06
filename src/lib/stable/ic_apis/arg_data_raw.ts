/**
 * Returns the raw argument data passed to the current method call.
 *
 * @returns The raw argument bytes as Uint8Array, or empty array if called outside the IC environment
 *
 * @remarks
 * - Commonly used in inspect_message handlers
 * - Used for low-level access to method parameters before Candid decoding.
 * - Useful for custom argument parsing or debugging
 * - Returns empty Uint8Array if called outside IC environment
 * - **Call Context**:
 *   - init
 *   - update
 *   - query
 *   - composite query
 *   - reply
 *   - inspectMessage
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
