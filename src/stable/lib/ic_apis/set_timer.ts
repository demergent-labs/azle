import { handleUncaughtError, validateUnsignedInteger } from '../error';

/**
 * Sets a one-time callback to be executed after a specified delay.
 *
 * @param delay - The time to wait before execution, in seconds. Maximum size 2^53 - 1
 * @param callback - The callback to execute. Can be async
 * @param asyncCleanup - If `true` (the default), another timer will be set with delay `0` to delete the global state created internally by Azle for this timer invocation. If your timer's callback does not trap, the extra timer is technically unnecessary. This is set to `true` by default for extra safety. This was designed for Azle's internal use, and you most likely should not attempt to change it
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
    callback: () => void | Promise<void>,
    asyncCleanup: boolean = true
): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    validateUnsignedInteger('setTimer delay', 53, delay);

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? BigInt(globalThis._azleIcExperimental.setTimer(delay.toString()))
            : globalThis._azleIcStable !== undefined
              ? globalThis._azleIcStable.setTimer(delay)
              : ((): never => {
                    throw new Error(
                        'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                    );
                })();

    globalThis._azleDispatch({
        type: 'SET_AZLE_TIMER_CALLBACK',
        payload: {
            timerId,
            timerCallback: async (): Promise<void> => {
                try {
                    if (asyncCleanup === true) {
                        // TODO it would be really nice to have a more elegant solution to this problem like inter-canister call's cleanup callback
                        // We immediately create another timer with a delay of 0 seconds
                        // to ensure that globalThis._azleTimerCallbacks is deleted even if the
                        // timer callback traps
                        setTimer(
                            0,
                            () => {
                                deleteGlobalTimerCallbacks(timerId);
                            },
                            false
                        );
                    }

                    // Though we are already calling cleanup above, we want to increase our chances
                    // of deletion of the global timer callbacks. I feel it is not impossible for the cleanup
                    // timer callback to trap, thus we ensure that if the timer callback above does not trap,
                    // then we still clean up within the same update call here.
                    // This also serves to delete the global timer callback created if cleanup is true
                    // This is above the call to callback to ensure that even if errors are thrown
                    // that the global timer callback is deleted, though this will not work if the thrown error ends in a trap,
                    // thus we have the asyncCleanup above
                    deleteGlobalTimerCallbacks(timerId);

                    await callback();
                } catch (error) {
                    handleUncaughtError(error);
                }
            }
        },
        location: {
            filepath: 'azle/src/stable/lib/ic_apis/set_timer.ts',
            functionName: 'setTimer'
        }
    });

    return timerId;
}

export function deleteGlobalTimerCallbacks(timerId: bigint): void {
    globalThis._azleDispatch({
        type: 'DELETE_AZLE_TIMER_CALLBACK',
        payload: timerId,
        location: {
            filepath: 'azle/src/stable/lib/ic_apis/set_timer.ts',
            functionName: 'deleteGlobalTimerCallbacks'
        }
    });
}
