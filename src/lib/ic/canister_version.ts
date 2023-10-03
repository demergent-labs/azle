import { IDL } from '@dfinity/candid';

export function canisterVersion() {
    const canisterVersionCandidBytes = globalThis._azleIc.canisterVersion();
    return IDL.decode([IDL.Nat64], canisterVersionCandidBytes)[0];
}
