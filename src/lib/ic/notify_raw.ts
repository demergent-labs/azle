import { IDL } from '@dfinity/candid';

export function notifyRaw(canisterId, method, argsRaw, payment) {
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
