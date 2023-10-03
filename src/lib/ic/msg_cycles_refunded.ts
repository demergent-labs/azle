import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded(): nat64 {
    const msgCyclesRefundedCandidBytes = globalThis._azleIc.msgCyclesRefunded();

    return BigInt(
        IDL.decode([IDL.Nat64], msgCyclesRefundedCandidBytes)[0] as number
    );
}
