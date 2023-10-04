import { IDL } from '@dfinity/candid';
import { Void } from '../candid/types/primitive/void';
import { TimerId } from './types';
import { encode } from '../candid/serde';

/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param id The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: TimerId): Void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    globalThis._azleIc.clearTimer(encode(TimerId, timerId).buffer);

    const timerCallbackId = globalThis.icTimers[timerId.toString()];

    delete globalThis.icTimers[timerId.toString()];
    delete globalThis._azleTimerCallbackIds[timerCallbackId];
}
