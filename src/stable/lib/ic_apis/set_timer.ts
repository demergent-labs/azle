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
              ? globalThis._azleIcStable.setTimer(delay, callback)
              : ((): never => {
                    throw new Error(
                        'Neither globalThis._azleIcStable nor globalThis._azleIcExperimental are defined'
                    );
                })();

    return timerId;
}
