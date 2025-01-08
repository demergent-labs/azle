import { v4 } from 'uuid';

/**
 * Sets a callback to be executed periodically at the specified interval.
 * To cancel the timer pass the returned timer ID to clearTimer
 *
 * @param interval - The time between executions in nanoseconds (as a bigint)
 * @param callback - The function to execute periodically. Can be async
 * @returns The timer ID (used with clearTimer to cancel), or 0n if called outside the IC environment
 * @throws {Error} If interval + current_time would exceed u64::MAX
 *
 * @remarks
 * - Timers are not persisted across canister upgrades
 * - Timer IDs are unique within a canister
 * - The timer can be cancelled using clearTimer
 * - Callbacks remain registered even if they throw errors
 * - **Call Context**:
 *   - init
 *   - postUpgrade
 *   - preUpgrade
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - heartbeat
 *   - timer
 *   - Note: Also cleanupCallback
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function setTimerInterval(
    interval: bigint,
    callback: () => void | Promise<void>
): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    const timerCallbackId = `_interval_timer_${v4()}`;

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.setTimerInterval(
                  interval.toString(),
                  timerCallbackId
              )
            : globalThis._azleIcStable.setTimerInterval(
                  interval.toString(),
                  timerCallbackId
              );

    globalThis._azleIcTimers[timerId.toString()] = timerCallbackId;

    // We don't delete this even if the callback throws because
    // it still needs to be here for the next tick
    globalThis._azleTimerCallbacks[timerCallbackId] = callback;

    return BigInt(timerId);
}
