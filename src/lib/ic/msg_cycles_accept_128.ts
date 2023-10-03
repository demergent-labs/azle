import { IDL } from '@dfinity/candid';

export function msgCyclesAccept128(maxAmount: nat64) {
    const maxAmountCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat], [maxAmount])
    ).buffer;

    const msgCyclesAccept128CandidBytes =
        globalThis._azleIc.msgCyclesAccept128(maxAmountCandidBytes);

    return IDL.decode([IDL.Nat], msgCyclesAccept128CandidBytes)[0];
}
