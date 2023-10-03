import { IDL } from '@dfinity/candid';

/**
 * Gets the amount of funds available in the canister
 * @returns the number of cycles in the canister
 */
export function canisterBalance128(): bigint {
    const canisterBalance128CandidBytes =
        globalThis._azleIc.canisterBalance128();
    return IDL.decode([IDL.Nat], canisterBalance128CandidBytes)[0];
}
