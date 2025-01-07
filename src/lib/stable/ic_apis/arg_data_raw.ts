/**
 * Returns the raw argument data passed to the current method call.
 *
 * @returns The raw argument bytes as Uint8Array, or empty array if called outside the IC environment
 *
 * @remarks
 * - **Call Context**:
 *   - init
 *   - postUpgrade
 *   - update
 *   - query (replicated and non-replicated)
 *   - composite query
 *   - after a cross-canister call
 *   - after a cross-canister call from a composite query
 *   - inspectMessage
 * - **When called outside of Call Context**:
 *   - Traps
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
