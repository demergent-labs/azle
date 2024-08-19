import { Principal } from '@dfinity/principal';

/** Determine if a {@link Principal} is a controller of the canister. */
export function isController(principal: Principal): boolean {
    if (globalThis._azleIc === undefined) {
        return false;
    }

    return globalThis._azleIc.isController(principal.toUint8Array().buffer);
}
