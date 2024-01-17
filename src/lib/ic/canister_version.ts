import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    return BigInt(globalThis._azleIc.canisterVersion());
}
