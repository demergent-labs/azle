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
    callback: () => void | Promise<void>
): bigint {
    if (
        globalThis._azleIc === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    validateUnsignedInteger('setTimer delay', 53, delay);

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? BigInt(globalThis._azleIcExperimental.setTimer(delay.toString()))
            : globalThis._azleIc !== undefined
              ? globalThis._azleIc.setTimer(delay)
              : ((): never => {
                    throw new Error(
                        'Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined'
                    );
                })();

    if (globalThis._azleDispatch === undefined) {
        throw new Error('globalThis._azleDispatch is undefined');
    }

    globalThis._azleDispatch({
        type: 'SET_AZLE_TIMER_CALLBACK',
        payload: {
            timerId,
            timerCallback: async (): Promise<void> => {
                try {
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
