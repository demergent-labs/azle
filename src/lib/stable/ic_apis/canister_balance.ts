/**
 * Returns the amount of cycles available in this canister's balance.
 *
 * @returns The number of cycles in the canister, or 0n if called outside the IC environment
 *
 * @remarks
 * - Cycles are the utility token used to pay for computation and storage
 * - Balance decreases as the canister consumes resources
 * - Balance increases when cycles are transferred to the canister
 * - Canister will be deleted if balance drops too low
 * - **Call Context**:
 *   - Any method
 *
 * @example
 * // Check if canister has enough cycles
 * if (canisterBalance() < minimumCycles) {
 *     throw new Error('Insufficient cycles');
 * }
 */
export function canisterBalance(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.canisterBalance());
    }

    return BigInt(globalThis._azleIcStable.canisterBalance());
}
