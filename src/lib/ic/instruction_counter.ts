import { IDL } from '@dfinity/candid';

/**
 * Returns the number of instructions that the canister executed since the
 * last [entry point](
 *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
 * )
 *
 * @returns the number of instructions
 */
export function instructionCounter(): bigint {
    const instructionCounterCandidBytes =
        globalThis._azleIc.instructionCounter();
    return IDL.decode([IDL.Nat64], instructionCounterCandidBytes)[0];
}
