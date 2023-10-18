import { Duration } from './types/duration';
import { TimerId } from './types/timer_id';
import { v4 } from 'uuid';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';

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

    const timerCallbackId = `_timer_${v4()}`;

    const timerId = decode(
        nat64,
        globalThis._azleIc.setTimer(
            encode(nat64, delay).buffer,
            timerCallbackId
        )
    );

    globalThis._azleIcTimers[timerId.toString()] = timerCallbackId;

    globalThis._azleTimerCallbacks[timerCallbackId] = () => {
        try {
            callback();
        } finally {
            delete globalThis._azleIcTimers[timerId.toString()];
            delete globalThis._azleTimerCallbacks[timerCallbackId];
        }
    };

    return timerId;
}
