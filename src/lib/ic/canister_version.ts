import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';

/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const canisterVersionCandidBytes = globalThis._azleIc.canisterVersion();
    return decode(nat64, canisterVersionCandidBytes);
}
