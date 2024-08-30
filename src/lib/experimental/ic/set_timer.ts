import '../experimental';

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
    delay: bigint,
    callback: () => void | Promise<void>
): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    const timerCallbackId = `_timer_${v4()}`;

    const timerId = globalThis._azleIc.setTimer(
        delay.toString(),
        timerCallbackId
    );

    globalThis._azleIcTimers[timerId] = timerCallbackId;

    globalThis._azleTimerCallbacks[timerCallbackId] = (): void => {
        try {
            callback();
        } finally {
            delete globalThis._azleIcTimers[timerId.toString()];
            delete globalThis._azleTimerCallbacks[timerCallbackId];
        }
    };

    return BigInt(timerId);
}
