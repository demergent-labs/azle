/**
 * Cancels a timer previously created with setTimer or setTimerInterval.
 *
 * @param timerId - The ID of the timer to cancel, as returned by setTimer/setTimerInterval
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Safe to call multiple times - does nothing if timer is already cancelled
 * - Cleans up internal timer callback references
 * - No effect if timer ID doesn't exist
 * - **Call Context**:
 *   - init
 *   - postUpgrade
 *   - preUpgrade
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - heartbeat
 *   - timer
 *   - Note: Assuming same as timer
 *   - Note: Also cleanupCallback
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
