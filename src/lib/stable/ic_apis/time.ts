/**
 * Gets the current system time of the Internet Computer.
 *
 * @returns The current timestamp in nanoseconds
 *
 * @remarks
 *
 * - Monotonically increasing even across canister upgrades
 * - Returns the number of nanoseconds since 1970-01-01 (Unix epoch).
 * - Within an invocation of one entry point, the time is constant
 *
 * - **Call Context**:
 *   - any besides start
 */
export function time(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.time());
    }

    return BigInt(globalThis._azleIcStable.time());
}
