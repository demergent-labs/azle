/**
 * Cancels an existing timer. Does nothing if the timer has already been canceled.
 * @param timerId The ID of the timer to be cancelled.
 */
export function clearTimer(timerId: bigint): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.clearTimer(timerId.toString());
    } else {
        globalThis._azleIcStable.clearTimer(timerId.toString());
    }

    const timerCallbackId = globalThis._azleIcTimers[timerId.toString()];

    delete globalThis._azleIcTimers[timerId.toString()];
    delete globalThis._azleTimerCallbacks[timerCallbackId];
}
