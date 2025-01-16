import { v4 } from 'uuid';

/**
 * Sets a callback to be executed periodically every specified interval.
 *
 * @param interval - The time between executions, in seconds. Represented as a u64 (max size 2^64 - 1)
 * @param callback - The callback to execute. Can be async
 *
 * @returns The timer ID (used with `clearTimer` to cancel the timer)
 *
 * @remarks
 * - Timers are not persisted across canister upgrades
 * - Timers are deactivated in the following cases
 *   - Changes to the canister's Wasm module
 *     - management canister
 *       - `install_code`
 *       - `install_chunked_code`
 *       - `uninstall_code`
 *     - When the canister runs out of cycles
 * - Traps if `interval` + `time()` is more than 2^64 - 1 (u64) nanoseconds
 *
 * - **Call Context**:
 *   - \@init
 *   - \@postUpgrade
 *   - \@preUpgrade
 *   - \@update
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
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
