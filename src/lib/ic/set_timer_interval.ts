import { IDL } from '@dfinity/candid';
import { Duration, TimerId } from './types';
import { v4 } from 'uuid';

/**
 * Sets callback to be executed every interval. Panics if `interval` + time() is more than 2^64 - 1.
 * To cancel the interval timer, pass the returned `TimerId` to `clearTimer`.
 * Note that timers are not persisted across canister upgrades.
 *
 * @param interval The interval (in seconds) between each callback execution.
 * @param callback the function to invoke after the specified delay has passed.
 * @returns the ID of the created timer. Used to cancel the timer.
 */
export function setTimerInterval(
    interval: Duration,
    callback: () => void | Promise<void>
): TimerId {
    const encode = (value: Duration) => {
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
    globalThis._azleTimerCallbackIds[timerCallbackId] = callback;

    return timerId;
}
