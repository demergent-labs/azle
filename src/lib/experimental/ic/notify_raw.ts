import '../experimental';

import { blob } from '../candid/types/constructed/blob';
import { nat } from '../candid/types/primitive/nats/nat';
import { text } from '../candid/types/primitive/text';
import { Void } from '../candid/types/primitive/void';
import { Principal } from '../candid/types/reference/principal';

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
        return undefined;
    }

    const canisterIdBytes = canisterId.toUint8Array().buffer;
    const argsRawBuffer = argsRaw.buffer;
    const paymentString = payment.toString();

    return globalThis._azleIc.notifyRaw(
        canisterIdBytes,
        method,
        argsRawBuffer,
        paymentString
    );
}
