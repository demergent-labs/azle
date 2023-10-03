import { IDL } from '@dfinity/candid';

export function msgCyclesRefunded128() {
    const msgCyclesRefunded128CandidBytes =
        globalThis._azleIc.msgCyclesRefunded128();

    return IDL.decode([IDL.Nat], msgCyclesRefunded128CandidBytes)[0];
}
