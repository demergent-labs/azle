/**
 * Returns the canister's version number, which is incremented by ICP on certain operations.
 *
 * @returns The canister's version number. Represented as a u64 (max size 2^64 - 1)
 *
 * @remarks
 *
 * The version number is guaranteed to increase when:
 * - The canister code is installed/reinstalled/upgraded
 * - The canister's controllers are modified
 * - The canister's status changes (running/stopping/stopped)
 * - A non-query message is successfully executed (except install_code)
 *
 * The version is preserved when:
 * - The canister is empty/uninstalled
 * - The canister is deleted and recreated with same ID
 * - Query calls are executed
 *
 * Note: The version may increase at any time, even when no apparent changes
 * have been made to the canister's state or configuration.
 *
 * - **Call Context**:
 *   - any besides start
 */
export function canisterVersion(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.canisterVersion());
    }

    return globalThis._azleIcStable.canisterVersion();
}
