import { IDL } from '@dfinity/candid';

/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): bigint {
    const canisterVersionCandidBytes = globalThis._azleIc.canisterVersion();
    return IDL.decode([IDL.Nat64], canisterVersionCandidBytes)[0];
}
