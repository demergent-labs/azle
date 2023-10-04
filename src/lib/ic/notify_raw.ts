import { Void } from '../candid/types/primitive/void';
import { nat } from '../candid/types/primitive/nats/nat';
import { blob } from '../candid/types/constructed/blob';
import { Principal, text } from '../candid';
import { encode } from '../candid/serde';

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
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const canisterIdBytes = canisterId.toUint8Array().buffer;
    const argsRawBuffer = argsRaw.buffer;
    const paymentCandidBytes = encode(nat, payment).buffer;

    return globalThis._azleIc.notifyRaw(
        canisterIdBytes,
        method,
        argsRawBuffer,
        paymentCandidBytes
    );
}
