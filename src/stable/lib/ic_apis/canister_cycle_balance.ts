/**
 * Returns the amount of cycles owned by and available to the canister.
 *
 * @returns The cycle balance. Represented as a u128 (max size 2^128 - 1)
 *
 * @remarks
 *
 * - The cycle balance is calculated as follows:
 *   - start at 0
 *   - add the current cycle balance before the execution of the current message
 *   - subtract a reserve to pay for the execution of the current message
 *   - subtract any cycles queued up to be sent via `ic0.call_cycles_add` and `ic0.call_cycles_add128`
 * - unused cycles from the reserve may be added back to the balance after message execution
 *
 * - **Call Context**:
 *   - any besides start
 */
export function canisterCycleBalance(): bigint {
    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.canisterCycleBalance());
    }

    if (globalThis._azleIcStable !== undefined) {
        return BigInt(globalThis._azleIcStable.canisterCycleBalance());
    }

    return 0n;
}
