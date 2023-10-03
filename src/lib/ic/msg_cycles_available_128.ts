import { IDL } from '@dfinity/candid';
import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Returns the amount of cycles that were transferred by the caller of the
 * current call, and is still available in this message
 * @returns the amount of cycles
 */
export function msgCyclesAvailable128(): nat {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesAvailable128CandidBytes =
        globalThis._azleIc.msgCyclesAvailable128();

    return BigInt(
        IDL.decode([IDL.Nat], msgCyclesAvailable128CandidBytes)[0] as number
    );
}
