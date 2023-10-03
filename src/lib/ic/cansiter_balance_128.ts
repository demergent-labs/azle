import { IDL } from '@dfinity/candid';

export function canisterBalance128() {
    const canisterBalance128CandidBytes =
        globalThis._azleIc.canisterBalance128();
    return IDL.decode([IDL.Nat], canisterBalance128CandidBytes)[0];
}
