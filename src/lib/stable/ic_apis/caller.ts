import { Principal } from '@dfinity/principal';

/**
 * Returns the principal of the caller of the current call
 * @returns the principal of the caller of the current call
 */
export function caller(): Principal {
    if (globalThis._azleIc === undefined) {
        return Principal.fromHex('04');
    }

    const callerBytes = globalThis._azleIc.caller();
    return Principal.fromUint8Array(new Uint8Array(callerBytes));
}
