/**
 * When called from a query call, returns the data certificate
 * authenticating `certifiedData` set by this canister. Otherwise returns
 * `undefined`.
 * @returns the data certificate or undefined
 */
export function dataCertificate(): Uint8Array | undefined {
    const certificate = globalThis._azleIc?.dataCertificate();
    if (certificate instanceof ArrayBuffer) {
        return new Uint8Array(certificate);
    }
    return undefined;
}
