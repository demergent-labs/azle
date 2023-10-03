import { IDL } from '@dfinity/candid';

export function clearTimer(timerId: nat64) {
    const encode = (value: nat64) => {
        return new Uint8Array(IDL.encode([IDL.Nat64], [value])).buffer;
    };

    globalThis._azleIc.clearTimer(encode(timerId));

    const timerCallbackId = globalThis.icTimers[timerId.toString()];

    delete globalThis.icTimers[timerId.toString()];
    delete globalThis[timerCallbackId];
}
