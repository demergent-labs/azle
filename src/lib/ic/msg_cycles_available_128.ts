import { IDL } from '@dfinity/candid';

export function msgCyclesAvailable128() {
    const msgCyclesAvailable128CandidBytes =
        globalThis._azleIc.msgCyclesAvailable128();

    return IDL.decode([IDL.Nat], msgCyclesAvailable128CandidBytes)[0];
}
