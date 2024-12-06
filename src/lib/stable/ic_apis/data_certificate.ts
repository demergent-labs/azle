/**
 * When called from a query call, returns the data certificate
 * authenticating `certifiedData` set by this canister. Otherwise returns
 * `undefined`.
 * @returns the data certificate or undefined
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
