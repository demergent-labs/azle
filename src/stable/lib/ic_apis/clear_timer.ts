/**
 * Cancels a timer previously created with `setTimer` or `setTimerInterval`.
 *
 * @param timerId - The ID of the timer to cancel, as returned by `setTimer` or `setTimerInterval`. Represented as a u64 (max size 2^64 - 1)
 *
 * @returns void
 *
 * @remarks
 * - Does nothing if timer is already cancelled
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
export function clearTimer(timerId: bigint): void {
    if (
        globalThis._azleIc === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.clearTimer(timerId.toString());
    }

    if (globalThis._azleIc !== undefined) {
        globalThis._azleIc.clearTimer(timerId.toString());
    }

    deleteGlobalTimerCallbacks(timerId);
}

function deleteGlobalTimerCallbacks(timerId: bigint): void {
    if (globalThis._azleDispatch === undefined) {
        throw new Error('globalThis._azleDispatch is undefined');
    }

    globalThis._azleDispatch({
        type: 'DELETE_AZLE_TIMER_CALLBACK',
        payload: timerId,
        location: {
            filepath: 'azle/src/stable/lib/ic_apis/clear_timer.ts',
            functionName: 'deleteGlobalTimerCallbacks'
        }
    });
}
