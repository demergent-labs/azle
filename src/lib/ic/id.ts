import { Principal } from '../candid/types/reference/principal';

/**
 * Gets the id of this canister
 * @returns the canister id
 */
export function id() {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    // TODO consider bytes instead of string, just like with caller
    const idString = globalThis._azleIc.id();
    return Principal.fromText(idString);
}
