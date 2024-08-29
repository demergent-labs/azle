import '../experimental';

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
    if (globalThis._azleIc === undefined) {
        return 0n;
    }

    return BigInt(globalThis._azleIc.instructionCounter());
}
