// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inspectMessage } from '../canister_methods/inspect_message'; // Used for links in comments

/**
 * Accepts the ingress message. Calling from outside the
 * {@link inspectMessage} context will cause the canister to trap.
 */
export function acceptMessage(): void {
    if (globalThis._azleIcStable === undefined) {
        return undefined;
    }

    globalThis._azleIcStable.acceptMessage();
}
