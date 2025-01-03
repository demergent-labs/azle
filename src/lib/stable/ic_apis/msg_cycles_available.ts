/**
 * Returns the amount of cycles that were transferred in the current call and are still available.
 *
 * @returns The amount of cycles available from the current call
 *
 * @example
 * const available = msgCyclesAvailable();
 * if (available >= requiredCycles) {
 *     msgCyclesAccept(requiredCycles);
 * }
 *
 * @remarks
 * - Returns 0n if called outside the IC environment
 * - Amount decreases as cycles are accepted by the canister
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
