import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const canisterBalanceCandidBytes = globalThis._azleIc.canisterBalance();
    return decode(nat64, canisterBalanceCandidBytes);
}
