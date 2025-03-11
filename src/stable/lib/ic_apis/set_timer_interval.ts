import { validateUnsignedInteger } from '../error';

/**
 * Sets a callback to be executed periodically every specified interval.
 *
 * @param interval - The time between executions, in seconds. Maximum size 2^53 - 1
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
    interval: number,
    callback: () => void | Promise<void>
): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    validateUnsignedInteger('setTimer interval', 53, interval);

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? BigInt(
                  globalThis._azleIcExperimental.setTimerInterval(
                      interval.toString()
                  )
              )
            : globalThis._azleIcStable !== undefined
              ? globalThis._azleIcStable.setTimerInterval(interval)
              : ((): never => {
                    throw new Error(
                        'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                    );
                })();

    // We don't call deleteGlobalTimerCallbacks here because the callback
    // still needs to exist for the next interval callback execution
    // Deletion of globalThis._azleTimerCallbacks in the context of setTimerInterval
    // only occurs through calling clearTimer or manual manipulation of globalThis._azleTimerCallbacks
    globalThis._azleDispatch({
        type: 'SET_AZLE_TIMER_CALLBACK',
        payload: {
            timerId,
            timerCallback: callback
        },
        location: {
            filepath: 'azle/src/stable/lib/ic_apis/set_timer_interval.ts',
            functionName: 'setTimerInterval'
        }
    });

    return timerId;
}
