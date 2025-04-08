/**
 * Returns the amount of cycles that were transferred with the current call and are still available.
 *
 * @returns The amount of cycles available. Represented as a u128 (max size 2^128 - 1)
 *
 * @remarks
 *
 * - Amount decreases as cycles are accepted by the canister
 *
 * - **Call Context**:
 *   - \@update
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 */
export function msgCyclesAvailable(): bigint {
    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.msgCyclesAvailable());
    }

    if (globalThis._azleIc !== undefined) {
        return BigInt(globalThis._azleIc.msgCyclesAvailable());
    }

    return 0n;
}
