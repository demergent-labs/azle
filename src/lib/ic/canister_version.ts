import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the canister version number
 *
 * @returns the version number
 */
export function canisterVersion(): nat64 {
    const canisterVersionCandidBytes = globalThis._azleIc.canisterVersion();
    return BigInt(
        IDL.decode([IDL.Nat64], canisterVersionCandidBytes)[0] as number
    );
}
