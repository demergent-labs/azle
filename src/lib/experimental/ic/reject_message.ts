import '../experimental';

import { text } from '../candid/types/primitive/text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ic } from '../ic'; // Used for links in comments

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
