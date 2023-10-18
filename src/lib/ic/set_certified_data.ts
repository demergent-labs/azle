import { blob } from '../candid/types/constructed/blob';
import { Void } from '../candid/types/primitive/void';
import { encode } from '../candid/serde/encode';

/**
 * Sets the certified data of this canister.
 *
 * Canisters can store up to 32 bytes of data that is certified by the
 * system on a regular basis. One can call {@link ic.dataCertificate} from a
 * {@link $query} call to get a certificate authenticating the value set by
 * calling this function.

 * This function can only be called from the following contexts:
 *
 * - {@link $init}, {@link $preUpgrade} and {@link $postUpgrade} hooks
 * - {@link $update} calls
 * - reply or reject callbacks
 *
 * This function traps if:
 *
 * - `data.length` > 32
 * - called from an illegal context (e.g. from a {@link $query} call)
 *
 * @param data the data to be set
 * @returns
 */
export function setCertifiedData(data: blob): Void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const dataBytes = encode(blob, data).buffer;

    return globalThis._azleIc.setCertifiedData(dataBytes);
}
