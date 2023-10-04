import { nat } from '../candid/types/primitive/nats/nat';
import { decode } from '../candid/serde';

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

    return BigInt(decode(nat, msgCyclesAvailable128CandidBytes) as number);
}
