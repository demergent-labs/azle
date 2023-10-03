import { IDL } from '@dfinity/candid';

export function setTimerInterval(
    interval: nat64,
    callback: () => void | Promise<void>
) {
    const encode = (value: nat64) => {
        return new Uint8Array(IDL.encode([IDL.Nat64], [value])).buffer;
    };

    const decode = (value: ArrayBufferLike) => {
        return BigInt(IDL.decode([IDL.Nat64], value)[0] as number);
    };

    const timerCallbackId = `_interval_timer_${v4()}`;

    const timerId = decode(
        globalThis._azleIc.setTimerInterval(encode(interval), timerCallbackId)
    );

    globalThis.icTimers[timerId.toString()] = timerCallbackId;

    // We don't delete this even if the callback throws because
    // it still needs to be here for the next tick
    globalThis[timerCallbackId] = callback;

    return timerId;
}
