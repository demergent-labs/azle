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
    return globalThis._azleIc
        ? globalThis._azleIc.rejectMessage()
        : (undefined as any);
}
