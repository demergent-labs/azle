import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';

/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept(maxAmount: nat64): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const maxAmountCandidBytes = encode(nat64, maxAmount).buffer;

    const msgCyclesAcceptCandidBytes =
        globalThis._azleIc.msgCyclesAccept(maxAmountCandidBytes);

    return decode(nat64, msgCyclesAcceptCandidBytes);
}
