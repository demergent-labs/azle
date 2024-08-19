import { experimentalMessage } from '../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ic } from '..'; // Used for links in comments
import { text } from '../candid/types/primitive/text';

/**
 * Returns the rejection message from the most recently executed
 * cross-canister call
 *
 * **Warning**: Traps if there is no reject message. It is recommended to
 * check {@link ic.rejectCode} first.
 *
 * @returns the rejection message
 */
export function rejectMessage(): text {
    return globalThis._azleIc ? globalThis._azleIc.rejectMessage() : '';
}
