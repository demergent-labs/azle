import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept(maxAmount: nat64): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const msgCyclesAcceptAmountMovedString = globalThis._azleIc.msgCyclesAccept(
        maxAmount.toString()
    );

    return BigInt(msgCyclesAcceptAmountMovedString);
}
