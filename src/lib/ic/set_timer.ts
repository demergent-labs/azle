import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { Duration, TimerId } from './types';
import { v4 } from 'uuid';

/**
 * Sets callback to be executed later, after delay. Panics if `delay` + time() is more than 2^64 - 1.
 * To cancel the timer before it executes, pass the returned `TimerId` to `clearTimer`.
 * Note that timers are not persisted across canister upgrades.
 *
 * @param delay The time (in seconds) to wait before executing the provided callback.
 * @param callback the function to invoke after the specified delay has passed.
 * @returns the ID of the created timer. Used to cancel the timer.
 */
export function setTimer(
    delay: Duration,
    callback: () => void | Promise<void>
): TimerId {
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
