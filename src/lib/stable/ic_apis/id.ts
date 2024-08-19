import { Principal } from '@dfinity/principal';

/**
 * Returns the canister's id as a principal
 * @returns the canister's id as a principal
 */
export function id(): Principal {
    if (globalThis._azleIc === undefined) {
        return Principal.fromHex('04');
    }

    // TODO consider bytes instead of string, just like with caller
    const idString = globalThis._azleIc.id();
    return Principal.fromText(idString);
}
