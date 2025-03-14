/**
 * Gets the current ICP system time.
 *
 * @returns The current ICP system time in nanoseconds since the epoch (1970-01-01). Represented as a u64 (max size 2^64 - 1)
 *
 * @remarks
 *
 * - The time, as observed by the canister, is monotonically increasing, even across canister upgrades
 * - Within an invocation of one entry point, the time is constant
 * - The times observed by different canisters are unrelated, and calls from one canister to another may appear to travel "backwards in time"
 * - The time will likely be close to the real time, though is not guaranteed to be so
 *
 * - **Call Context**:
 *   - any besides start
 */
export function time(): bigint {
    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.time());
    }

    if (globalThis._azleIcStable !== undefined) {
        return globalThis._azleIcStable.time();
    }

    return 0n;
}
