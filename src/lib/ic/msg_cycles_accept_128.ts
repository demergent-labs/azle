import { IDL } from '@dfinity/candid';
import { nat } from '../candid/types/primitive/nats/nat';

/**
 * Moves cycles from the call to the canister balance
 * @param maxAmount the max amount of cycles to move
 * @returns the actual amount moved
 */
export function msgCyclesAccept128(maxAmount: nat): nat {
    const maxAmountCandidBytes = new Uint8Array(
        IDL.encode([IDL.Nat], [maxAmount])
    ).buffer;

    const msgCyclesAccept128CandidBytes =
        globalThis._azleIc.msgCyclesAccept128(maxAmountCandidBytes);

    return BigInt(
        IDL.decode([IDL.Nat], msgCyclesAccept128CandidBytes)[0] as number
    );
}
