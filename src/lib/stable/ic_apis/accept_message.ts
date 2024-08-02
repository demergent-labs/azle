// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspectMessage } from '../canister_methods/inspect_message'; // Used for links in comments

/**
 * Accepts the ingress message. Calling from outside the
 * {@link inspectMessage} context will cause the canister to trap.
 */
export function acceptMessage(): void {
    return globalThis._azleIc ? globalThis._azleIc.acceptMessage() : undefined;
}
