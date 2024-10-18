import { Principal } from '@dfinity/principal';

/**
 * Returns the canister's id as a principal
 * @returns the canister's id as a principal
 */
export function id(): Principal {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return Principal.fromHex('04');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromText(globalThis._azleIcExperimental.id());
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.id());
}
