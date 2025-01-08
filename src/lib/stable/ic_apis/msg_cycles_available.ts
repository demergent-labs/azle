/**
 * Returns the amount of cycles that were transferred in the current call and are still available.
 *
 * @returns The amount of cycles available from the current call, or 0n if called outside the IC environment
 *
 * @remarks
 * - Amount decreases as cycles are accepted by the canister
 * - **Call Context**:
 *   - update
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function msgCyclesAvailable(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.msgCyclesAvailable());
    }

    return BigInt(globalThis._azleIcStable.msgCyclesAvailable());
}
