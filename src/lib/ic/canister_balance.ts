import { IDL } from '@dfinity/candid';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance(): bigint {
    const canisterBalanceCandidBytes = globalThis._azleIc.canisterBalance();
    return IDL.decode([IDL.Nat64], canisterBalanceCandidBytes)[0];
}
