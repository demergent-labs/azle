import { IDL } from '@dfinity/candid';
import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded128(): nat {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesRefunded128CandidBytes =
        globalThis._azleIc.msgCyclesRefunded128();

    return BigInt(
        IDL.decode([IDL.Nat], msgCyclesRefunded128CandidBytes)[0] as number
    );
}
