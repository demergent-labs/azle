import '../experimental';

import { bool } from '../candid/types/primitive/bool';
import { Principal } from '../candid/types/reference/principal';

/** Determine if a {@link Principal} is a controller of the canister. */
export function isController(principal: Principal): bool {
    if (globalThis._azleIc === undefined) {
        return false;
    }

    return globalThis._azleIc.isController(principal.toUint8Array().buffer);
}
