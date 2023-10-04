import { Duration, TimerId } from './types';
import { v4 } from 'uuid';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { encode, decode as azleDecode } from '../candid/serde';

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
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const decode = (value: ArrayBufferLike) => {
        return BigInt(azleDecode(nat64, value) as number);
    };

    const timerCallbackId = `_timer_${v4()}`;

    const timerId = decode(
        globalThis._azleIc.setTimer(
            encode(nat64, delay).buffer,
            timerCallbackId
        )
    );

    globalThis.icTimers[timerId.toString()] = timerCallbackId;

    globalThis._azleTimerCallbackIds[timerCallbackId] = () => {
        try {
            callback();
        } finally {
            delete globalThis.icTimers[timerId.toString()];
            delete globalThis._azleTimerCallbackIds[timerCallbackId];
        }
    };

    return timerId;
}
