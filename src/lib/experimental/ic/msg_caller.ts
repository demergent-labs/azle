import '../experimental';

import { Principal } from '../candid/types/reference/principal';

/**
 * Returns the caller of the current call
 * @returns the caller of the current call
 */
export function msgCaller(): Principal {
    if (globalThis._azleIcExperimental === undefined) {
        return Principal.fromHex('04');
    }

    const callerBytes = globalThis._azleIcExperimental.msgCaller();
    return Principal.fromUint8Array(new Uint8Array(callerBytes));
}
