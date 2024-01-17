import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept128(maxAmount: nat): nat {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesAccept128AmountMovedString =
        globalThis._azleIc.msgCyclesAccept128(maxAmount.toString());

    return BigInt(msgCyclesAccept128AmountMovedString);
}
