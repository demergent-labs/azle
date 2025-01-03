/**
 * Returns the number of instructions that the canister executed since the
 * last [entry point](
 *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
 * )
 *
 * @deprecated Use {@link performanceCounter}(0) instead to get instruction count
 * @returns The number of instructions, or 0n if called outside the IC environment
 *
 * @remarks
 * This function is deprecated in favor of performanceCounter which provides more functionality
 */
export function instructionCounter(): bigint {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return 0n;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return BigInt(globalThis._azleIcExperimental.instructionCounter());
    }

    return BigInt(globalThis._azleIcStable.instructionCounter());
}
