/**
 * Returns the number of instructions that the canister executed since the
 * last [entry point](
 *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
 * )
 *
 * @returns the number of instructions
 */
export function instructionCounter(): bigint {
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.instructionCounter());
}
