import { IDL } from '@dfinity/candid';
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

    const maxAmountCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat64], [maxAmount])
    ).buffer;

    const msgCyclesAcceptCandidBytes =
        globalThis._azleIc.msgCyclesAccept(maxAmountCandidBytes);

    return BigInt(
        IDL.decode([IDL.Nat64], msgCyclesAcceptCandidBytes)[0] as number
    );
}
