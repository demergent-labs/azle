import { Void } from '../candid/types/primitive/void';
import { TimerId } from './types/timer_id';
import { encode } from '../candid/serde/encode';

/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param id The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: TimerId): Void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    globalThis._azleIc.clearTimer(encode(TimerId, timerId).buffer);

    const timerCallbackId = globalThis._azleIcTimers[timerId.toString()];

    delete globalThis._azleIcTimers[timerId.toString()];
    delete globalThis._azleTimerCallbacks[timerCallbackId];
}
