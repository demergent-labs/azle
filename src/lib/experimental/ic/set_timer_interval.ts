import '../experimental';

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
    interval: bigint,
    callback: () => void | Promise<void>
): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    const timerCallbackId = `_interval_timer_${v4()}`;

    const timerId = globalThis._azleIc.setTimerInterval(
        interval.toString(),
        timerCallbackId
    );

    globalThis._azleIcTimers[timerId] = timerCallbackId;

    // We don't delete this even if the callback throws because
    // it still needs to be here for the next tick
    globalThis._azleTimerCallbacks[timerCallbackId] = callback;

    return BigInt(timerId);
}
