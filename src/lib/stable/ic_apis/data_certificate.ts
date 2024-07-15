/**
 * When called from a query call, returns the data certificate
 * authenticating `certifiedData` set by this canister. Otherwise returns
 * `None`.
 * @returns the data certificate or None
 */
export function dataCertificate(): [Uint8Array] | [] {
    if (globalThis._azleIc === undefined) {
        return [];
    }

    const rawRustValue = globalThis._azleIc.dataCertificate();

    return rawRustValue === undefined ? [] : [new Uint8Array(rawRustValue)];
}
