import { nat } from '../candid/types/primitive/nats/nat';
import { decode } from '../candid/serde/decode';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance128(): nat {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const canisterBalance128CandidBytes =
        globalThis._azleIc.canisterBalance128();
    return decode(nat, canisterBalance128CandidBytes);
}
