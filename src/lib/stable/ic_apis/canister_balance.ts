/**
 * Returns the amount of cycles available in this canister's balance.
 *
 * @returns The number of cycles in the canister, or 0n if called outside the IC environment
 *
 * @remarks
 * - **Call Context**:
 *   - Any method
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
