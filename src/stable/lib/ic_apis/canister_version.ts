/**
 * Returns the canister's version number, which is incremented by ICP on certain operations.
 *
 * @returns The canister's version number. Represented as a u64 (max size 2^64 - 1)
 *
 * @remarks
 *
 * The version number starts at 0 upon canister creation. The version number is guaranteed to increase when:
 * - Changes to canister code
 * - Changes to canister settings
 * - Changes to canister running status (Running/Stopping/Stopped)
 * - Changes to memory (WASM memory or stable memory)
 * - Any successful management canister call (`update_settings`, `load_canister_snapshot`, `install_code`, `install_chunked_code`, `uninstall_code`, `start_canister`, and `stop_canister`)
 * - Canister runs out of cycles and code is uninstalled
 * - Successful execution of update methods, heartbeats, global timers, or response callbacks
 *
 * Note: The system may arbitrarily increment the version at any time, even when
 * no observable changes occur
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
