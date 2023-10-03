import { Void } from '../candid/types/primitive/void';

/**
 * Accepts the ingress message. Calling from outside the
 * {@link $inspectMessage} context will cause the canister to trap.
 */
export function acceptMessage(): Void {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
