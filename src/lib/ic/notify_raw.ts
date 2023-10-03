import { IDL } from '@dfinity/candid';
import { Void } from '../candid/types/primitive/void';
import { nat } from '../candid/types/primitive/nats/nat';
import { blob } from '../candid/types/constructed/blob';
import { Principal, text } from '../candid';

/**
 * Like notify, but sends the argument as raw bytes, skipping Candid serialization.
 * @param canisterId
 * @param method
 * @param argsRaw
 * @param payment
 * @returns
 */
export function notifyRaw(
    canisterId: Principal,
    method: text,
    argsRaw: blob,
    payment: nat
): Void {
    const canisterIdBytes = canisterId.toUint8Array().buffer;
    const argsRawBuffer = argsRaw.buffer;
    const paymentCandidBytes = new Uint8Array(IDL.encode([IDL.Nat], [payment]))
        .buffer;

    return globalThis._azleIc.notifyRaw(
        canisterIdBytes,
        method,
        argsRawBuffer,
        paymentCandidBytes
    );
}
