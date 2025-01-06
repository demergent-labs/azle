/**
 * Returns the data certificate authenticating this canister's certified data.
 *
 * @returns The data certificate as a Uint8Array, or undefined if:
 *   - Called during an update call
 *   - No certified data is set
 *   - Called outside the IC environment
 *
 * @remarks
 * - Used in conjunction with setCertifiedData
 * - Enables query calls to return certified responses
 * - Only meaningful during query calls
 * - **Call Context**:
 *   - query
 *   - composite query
 */
export function dataCertificate(): Uint8Array | undefined {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        const result = globalThis._azleIcExperimental.dataCertificate();

        if (result === undefined) {
            return undefined;
        }

        return new Uint8Array(result);
    }

    return globalThis._azleIcStable.dataCertificate();
}
