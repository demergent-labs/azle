/**
 * Returns the data certificate authenticating the canister's certified data.
 *
 * @returns The data certificate, or undefined if called outside of the following:
 *   - a non-replicated query call from an ingress message
 *   - a composite query call from an ingress message before an inter-canister await
 *
 * @remarks
 *
 * - Used in conjunction with `setCertifiedData`
 * - Enables query calls to return certified responses
 *
 * - **Call Context**:
 *   - any besides start
 */
export function dataCertificate(): Uint8Array | undefined {
    if (globalThis._azleIcExperimental !== undefined) {
        const result = globalThis._azleIcExperimental.dataCertificate();

        if (result === undefined) {
            return undefined;
        }

        return new Uint8Array(result);
    }

    if (globalThis._azleIcStable !== undefined) {
        return globalThis._azleIcStable.dataCertificate();
    }
}
