import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';

/**
 * Returns the amount of cycles that came back with the response as a refund.
 * The refund has already been added to the canister balance automatically.
 * @returns the amount of cycles
 */
export function msgCyclesRefunded(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesRefundedCandidBytes = globalThis._azleIc.msgCyclesRefunded();

    return decode(nat64, msgCyclesRefundedCandidBytes);
}
