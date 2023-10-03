import { IDL } from '@dfinity/candid';

/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable(): bigint {
    const msgCyclesAvailableCandidBytes =
        globalThis._azleIc.msgCyclesAvailable();

    return IDL.decode([IDL.Nat64], msgCyclesAvailableCandidBytes)[0];
}
