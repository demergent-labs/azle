import { IDL } from '@dfinity/candid';

export function performanceCounter(counterType: nat32) {
    const counterTypeCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat32], [counterType])
    ).buffer;

    const performanceCounterCandidBytes = globalThis._azleIc.performanceCounter(
        counterTypeCandidBytes
    );

    return IDL.decode([IDL.Nat64], performanceCounterCandidBytes)[0];
}
