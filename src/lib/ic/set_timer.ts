import { IDL } from '@dfinity/candid';

export function setTimer(delay: nat64, callback: () => void | Promise<void>) {
    const encode = (value: nat64) => {
        return new Uint8Array(IDL.encode([IDL.Nat64], [value])).buffer;
    };

    const decode = (value: ArrayBufferLike) => {
        return BigInt(IDL.decode([IDL.Nat64], value)[0] as number);
    };

    const timerCallbackId = `_timer_${v4()}`;

    const timerId = decode(
        globalThis._azleIc.setTimer(encode(delay), timerCallbackId)
    );

    globalThis.icTimers[timerId.toString()] = timerCallbackId;

    globalThis[timerCallbackId] = () => {
        try {
            callback();
        } finally {
            delete globalThis.icTimers[timerId.toString()];
            delete globalThis[timerCallbackId];
        }
    };

    return timerId;
}
