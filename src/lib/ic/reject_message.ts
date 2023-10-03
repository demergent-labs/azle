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
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
