import { IDL } from '@dfinity/candid';

export function msgCyclesAvailable() {
    const msgCyclesAvailableCandidBytes =
        globalThis._azleIc.msgCyclesAvailable();

    return IDL.decode([IDL.Nat64], msgCyclesAvailableCandidBytes)[0];
}
