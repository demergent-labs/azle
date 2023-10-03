import { IDL } from '@dfinity/candid';

export function time() {
    const timeCandidBytes = globalThis._azleIc.time();
    return IDL.decode([IDL.Nat64], timeCandidBytes)[0];
}
