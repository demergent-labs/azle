import { v4 } from 'uuid';

/**
 * Sets a one-time callback to be executed after a specified delay.
 *
 * @param delay - The time to wait before execution, in seconds. Represented as a u64 (max size 2^64 - 1)
 * @param callback - The callback to execute. Can be async
 *
 * @returns The timer ID (used with `clearTimer` to cancel the timer before it executes)
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
 * - Traps if `delay` + `time()` is more than 2^64 - 1 (u64) nanoseconds
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
export function setTimer(
    delay: number,
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
            ? BigInt(
                  globalThis._azleIcExperimental.setTimer(
                      delay.toString(),
                      timerCallbackId
                  )
              )
            : globalThis._azleIcStable.setTimer(delay, timerCallbackId);

    globalThis._azleTimerCallbackIds[timerId.toString()] = timerCallbackId;

    globalThis._azleTimerCallbacks[timerCallbackId] = (): void => {
        try {
            // We immediately create another timer with a delay of 0 seconds
            // to ensure that the timer globals are deleted even if the
            // timer callback traps
            setTimer(0, () => {
                deleteTimerGlobals(timerId);
            });

            callback();
        } finally {
            // In the happy path where callback() doesn't trap (even if it throws an error)
            // this will run and delete the timer globals
            // TODO it is debatable whether we need this finally if we use the setTimer above
            // TODO it is debatable whether we even need the setTimer above, as devs could
            // TODO manually call clearTimer if there were ever a problem
            // TODO and the global state could be observed easily
            deleteTimerGlobals(timerId);
        }
    };

    return timerId;
}

export function deleteTimerGlobals(timerId: bigint): void {
    const timerIdString = timerId.toString();

    const timerCallbackId = globalThis._azleTimerCallbackIds[timerIdString];

    delete globalThis._azleTimerCallbackIds[timerIdString];
    delete globalThis._azleTimerCallbacks[timerCallbackId];
}
