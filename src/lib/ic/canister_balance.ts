import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): nat64 {
    const canisterBalanceCandidBytes = globalThis._azleIc.canisterBalance();
    return BigInt(
        IDL.decode([IDL.Nat64], canisterBalanceCandidBytes)[0] as number
    );
}
