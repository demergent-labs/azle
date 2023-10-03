import { Principal } from '../candid/types/reference/principal';
import { bool } from '../candid/types/primitive/bool';

/** Determine if a {@link Principal} is a controller of the canister. */
export function isController(principal: Principal): bool {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return globalThis._azleIc.isController(principal.toUint8Array().buffer);
}
