// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { rejectCode } from './reject_code'; // Used for links in comments

/**
 * Returns the rejection message from the last failed cross-canister call.
 *
 * @returns The rejection message, or empty string if called outside the IC environment
 *
 * @remarks
 * - Will trap if there is no reject message available
 * - Always check {@link rejectCode} before calling this function
 * - Returns empty string if called outside IC environment
 * - **Call Context**:
 *   - reject callback
 *   - reject callback in a composite query
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
