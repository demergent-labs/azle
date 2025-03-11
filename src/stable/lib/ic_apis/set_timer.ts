import { validateUnsignedInteger } from '../error';

/**
 * Sets a one-time callback to be executed after a specified delay.
 *
 * @param delay - The time to wait before execution, in seconds. Maximum size 2^53 - 1
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
            timerCallback: (): void => {
                // TODO it would be really nice to have a more elegant solution to this problem like inter-canister call's cleanup callback
                // We immediately create another timer with a delay of 0 seconds
                // to ensure that globalThis._azleTimerCallbacks is deleted even if the
                // timer callback traps
                setTimer(0, () => {
                    deleteGlobalTimerCallbacks(timerId);
                });

                callback();
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
