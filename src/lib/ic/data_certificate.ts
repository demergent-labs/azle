import { blob } from '../candid/types/constructed/blob';
import { None, Opt, Some } from '../candid/types/constructed/opt';

/**
 * When called from a query call, returns the data certificate
 * authenticating `certifiedData` set by this canister. Otherwise returns
 * `None`.
 * @returns the data certificate or None
 */
export function dataCertificate(): Opt<blob> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const rawRustValue = globalThis._azleIc.dataCertificate();

    return rawRustValue === undefined
        ? None
        : Some(new Uint8Array(rawRustValue));
}
