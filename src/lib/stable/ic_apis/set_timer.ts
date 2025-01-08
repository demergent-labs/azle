import { v4 } from 'uuid';

/**
 * Sets a one-time callback to be executed after a specified delay.
 *
 * @param delay - The time to wait before execution, in nanoseconds
 * @param callback - The function to execute after the delay. Can be async
 * @returns The timer ID (used with clearTimer to cancel), or 0n if called outside the IC environment
 * @throws {Error} If delay + current_time would exceed u64::MAX
 *
 * @remarks
 * - Timers are not persisted across canister upgrades
 * - Timer IDs are unique within a canister
 * - The timer can be cancelled before execution using clearTimer
 * - The callback registration is automatically cleaned up after execution
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
export function setTimer(
    delay: bigint,
    callback: () => void | Promise<void>
): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    const timerCallbackId = `_timer_${v4()}`;

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? globalThis._azleIcExperimental.setTimer(
                  delay.toString(),
                  timerCallbackId
              )
            : globalThis._azleIcStable.setTimer(
                  delay.toString(),
                  timerCallbackId
              );

    globalThis._azleIcTimers[timerId.toString()] = timerCallbackId;

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
