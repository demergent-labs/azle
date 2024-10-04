import '../experimental';

import { Principal } from '../candid/types/reference/principal';

/**
 * Gets the id of this canister
 * @returns the canister id
 */
export function id(): Principal {
    if (globalThis._azleIcExperimental === undefined) {
        return Principal.fromHex('04');
    }

    // TODO consider bytes instead of string, just like with caller
    const idString = globalThis._azleIcExperimental.id();
    return Principal.fromText(idString);
}
