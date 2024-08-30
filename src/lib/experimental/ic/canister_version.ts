import '../experimental';

import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): nat64 {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.canisterVersion());
}
