import { Principal } from '@dfinity/principal';

/**
 * Returns the principal of the caller of the current call
 * @returns the principal of the caller of the current call
 */
export function caller(): Principal {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return Principal.fromHex('04');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return Principal.fromUint8Array(
            new Uint8Array(globalThis._azleIcExperimental.caller())
        );
    }

    return Principal.fromUint8Array(globalThis._azleIcStable.caller());
}
