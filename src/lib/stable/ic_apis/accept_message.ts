// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspectMessage } from '../canister_methods/inspect_message'; // Used for links in comments

/**
 * Accepts an ingress message during message inspection.
 * Must be called from within an {@link inspectMessage} handler to indicate the message should be processed.
 *
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Only valid within inspect_message context
 * - Signals that a message should proceed to execution
 * - Part of the message inspection control flow
 * - Cannot be called after reject_message
 * - Traps if called outside inspect_message context
 *
 * @example
 * // In an inspect_message handler
 * export function inspectMessage(): boolean {
 *     if (isMessageValid()) {
 *         acceptMessage();
 *         return true;
 *     }
 *     return false;
 * }
 */
export function acceptMessage(): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.acceptMessage();
        return;
    }

    globalThis._azleIcStable.acceptMessage();
}
