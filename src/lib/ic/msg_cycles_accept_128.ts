import { nat } from '../candid/types/primitive/nats/nat';
import { decode, encode } from '../candid/serde';

/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept128(maxAmount: nat): nat {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const maxAmountCandidBytes = encode(nat, maxAmount).buffer;

    const msgCyclesAccept128CandidBytes =
        globalThis._azleIc.msgCyclesAccept128(maxAmountCandidBytes);

    return BigInt(decode(nat, msgCyclesAccept128CandidBytes) as number);
}
