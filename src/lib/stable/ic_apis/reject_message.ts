// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { rejectCode } from './reject_code'; // Used for links in comments

/**
 * Returns the rejection message from the most recently executed
 * cross-canister call
 *
 * **Warning**: Traps if there is no reject message. It is recommended to
 * check {@link rejectCode} first.
 *
 * @returns the rejection message
 */
export function rejectMessage(): string {
    return globalThis._azleIc ? globalThis._azleIc.rejectMessage() : '';
}
