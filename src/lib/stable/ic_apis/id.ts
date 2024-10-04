import { Principal } from '@dfinity/principal';

/**
 * Returns the canister's id as a principal
 * @returns the canister's id as a principal
 */
export function id(): Principal {
    if (globalThis._azleIc === undefined) {
        return Principal.fromHex('04');
    }

    return Principal.fromUint8Array(globalThis._azleIc.id());
}
