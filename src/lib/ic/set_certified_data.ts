import { IDL } from '@dfinity/candid';

export function setCertifiedData(data) {
    const dataBytes = new Uint8Array(IDL.encode([IDL.Vec(IDL.Nat8)], [data]))
        .buffer;

    return globalThis._azleIc.setCertifiedData(dataBytes);
}
