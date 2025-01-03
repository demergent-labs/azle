// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { rejectCode } from './reject_code'; // Used for links in comments

/**
 * Returns the rejection message from the most recently executed cross-canister call.
 * This provides details about why the call was rejected.
 *
 * @returns The rejection message, or empty string if called outside the IC environment
 * @remarks
 * - Will trap if there is no reject message available
 * - Always check {@link rejectCode} before calling this function
 *
 * @example
 * const code = rejectCode();
 * if (!('NoError' in code)) {
 *   const message = rejectMessage();
 *   // Handle the rejection...
 * }
 */
export function rejectMessage(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.rejectMessage();
    }

    return globalThis._azleIcStable.rejectMessage();
}
