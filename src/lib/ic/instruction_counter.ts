import { nat64 } from '../candid/types/primitive/nats/nat64';
import { decode } from '../candid/serde/decode';

/**
 * Returns the number of instructions that the canister executed since the
 * last [entry point](
 *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
 * )
 *
 * @returns the number of instructions
 */
export function instructionCounter(): nat64 {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const instructionCounterCandidBytes =
        globalThis._azleIc.instructionCounter();
    return decode(nat64, instructionCounterCandidBytes);
}
