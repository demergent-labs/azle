import { Principal } from '../';

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
    method: string,
    argsRaw: Uint8Array,
    payment: bigint
): void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
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
