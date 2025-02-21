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

    const timerId =
        globalThis._azleIcExperimental !== undefined
            ? BigInt(globalThis._azleIcExperimental.setTimer(delay.toString()))
            : globalThis._azleIcStable.setTimer(delay);

    globalThis._azleTimerCallbacks[timerId.toString()] = (): void => {
        // TODO it would be really nice to have a more elegant solution to this problem like inter-canister call's cleanup callback
        // We immediately create another timer with a delay of 0 seconds
        // to ensure that the timer globals are deleted even if the
        // timer callback traps
        setTimer(0, () => {
            deleteGlobalTimerCallbacks(timerId);
        });

        callback();
    };

    return timerId;
}

export function deleteGlobalTimerCallbacks(timerId: bigint): void {
    delete globalThis._azleTimerCallbacks[timerId.toString()];
}
