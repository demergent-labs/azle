import { IDL } from '@dfinity/candid';
import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance128(): nat {
    const canisterBalance128CandidBytes =
        globalThis._azleIc.canisterBalance128();
    return BigInt(
        IDL.decode([IDL.Nat], canisterBalance128CandidBytes)[0] as number
    );
}
