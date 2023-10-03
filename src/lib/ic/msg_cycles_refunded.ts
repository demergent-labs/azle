import { IDL } from '@dfinity/candid';

export function msgCyclesRefunded() {
    const msgCyclesRefundedCandidBytes = globalThis._azleIc.msgCyclesRefunded();

    return IDL.decode([IDL.Nat64], msgCyclesRefundedCandidBytes)[0];
}
