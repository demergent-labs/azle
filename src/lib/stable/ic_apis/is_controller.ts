import { Principal } from '@dfinity/principal';

/** Determine if a {@link Principal} is a controller of the canister. */
export function isController(principal: Principal): boolean {
    if (globalThis._azleIcStable === undefined) {
        return false;
    }

    return globalThis._azleIcStable.isController(principal.toUint8Array());
}
