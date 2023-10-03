import { Void } from '../candid/types/primitive/void';

/**
 * Accepts the ingress message. Calling from outside the
 * {@link $inspectMessage} context will cause the canister to trap.
 */
export const acceptMessage = () => Void;
