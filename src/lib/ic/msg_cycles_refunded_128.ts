import { IDL } from '@dfinity/candid';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded128(): bigint {
    const msgCyclesRefunded128CandidBytes =
        globalThis._azleIc.msgCyclesRefunded128();

    return IDL.decode([IDL.Nat], msgCyclesRefunded128CandidBytes)[0];
}
