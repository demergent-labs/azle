import { IDL } from '@dfinity/candid';
import { nat64 } from '../candid/types/primitive/nats/nat64';

/**
 * Returns the number of instructions that the canister executed since the
 * last [entry point](
 *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
 * )
 *
 * @returns the number of instructions
 */
export function instructionCounter(): nat64 {
    const instructionCounterCandidBytes =
        globalThis._azleIc.instructionCounter();
    return BigInt(
        IDL.decode([IDL.Nat64], instructionCounterCandidBytes)[0] as number
    );
}
