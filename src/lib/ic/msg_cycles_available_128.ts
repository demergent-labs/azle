import { IDL } from '@dfinity/candid';

/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable128(): bigint {
    const msgCyclesAvailable128CandidBytes =
        globalThis._azleIc.msgCyclesAvailable128();

    return IDL.decode([IDL.Nat], msgCyclesAvailable128CandidBytes)[0];
}
