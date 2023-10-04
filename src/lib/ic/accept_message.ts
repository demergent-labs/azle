import { Void } from '../candid/types/primitive/void';

/**
 * Accepts the ingress message. Calling from outside the
 * {@link $inspectMessage} context will cause the canister to trap.
 */
export function acceptMessage(): Void {
    return globalThis._azleIc ? globalThis._azleIc.acceptMessage() : undefined;
}
