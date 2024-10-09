import { Principal } from '@dfinity/principal';

/**
 * Returns the principal of the caller of the current call
 * @returns the principal of the caller of the current call
 */
export function caller(): Principal {
    if (globalThis._azleIcStable === undefined) {
        return Principal.fromHex('04');
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.caller());
}
