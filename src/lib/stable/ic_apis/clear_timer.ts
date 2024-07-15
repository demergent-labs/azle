/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param id The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: bigint): void {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    globalThis._azleIc.clearTimer(timerId.toString());

    const timerCallbackId = globalThis._azleIcTimers[timerId.toString()];

    delete globalThis._azleIcTimers[timerId.toString()];
    delete globalThis._azleTimerCallbacks[timerCallbackId];
}
