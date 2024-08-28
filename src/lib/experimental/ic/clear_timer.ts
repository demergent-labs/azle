import '../experimental';

import { Void } from '../candid/types/primitive/void';

/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param id The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: bigint): Void {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    globalThis._azleIc.clearTimer(timerId.toString());

    const timerCallbackId = globalThis._azleIcTimers[timerId.toString()];

    delete globalThis._azleIcTimers[timerId.toString()];
    delete globalThis._azleTimerCallbacks[timerCallbackId];
}
