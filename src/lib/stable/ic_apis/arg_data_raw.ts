/**
 * Returns the raw argument data passed to the current method call.
 *
 * @returns The raw argument bytes as Uint8Array, or empty array if called outside the IC environment
 *
 * @remarks
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
