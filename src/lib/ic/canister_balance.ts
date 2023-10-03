import { IDL } from '@dfinity/candid';

export function canisterBalance() {
    const canisterBalanceCandidBytes = globalThis._azleIc.canisterBalance();
    return IDL.decode([IDL.Nat64], canisterBalanceCandidBytes)[0];
}
