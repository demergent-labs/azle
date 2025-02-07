/**
 * Returns the argument data of the current method call as bytes.
 *
 * @returns The argument bytes
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@inspectMessage
 *   - \@update
 *   - \@query, replicated and non-replicated
 *   - \@query(..., { composite: true })
 *   - after a successful inter-canister await
 *   - after a successful inter-canister await from a composite query
 */
export function msgArgData(): Uint8Array<ArrayBuffer> {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return new Uint8Array(new ArrayBuffer(0));
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return new Uint8Array(globalThis._azleIcExperimental.msgArgData());
    }

    return globalThis._azleIcStable.msgArgData();
}
