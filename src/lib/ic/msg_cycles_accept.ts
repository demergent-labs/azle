import { IDL } from '@dfinity/candid';

export function msgCyclesAccept(maxAmount: nat64) {
    const maxAmountCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64], [maxAmount])
    ).buffer;

    const msgCyclesAcceptCandidBytes =
        globalThis._azleIc.msgCyclesAccept(maxAmountCandidBytes);

    return IDL.decode([IDL.Nat64], msgCyclesAcceptCandidBytes)[0];
}
