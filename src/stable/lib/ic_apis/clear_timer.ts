import { deleteGlobalTimerCallbacks } from './set_timer';

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
