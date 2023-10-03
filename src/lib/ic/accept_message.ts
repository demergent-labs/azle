/**
 * Accepts the ingress message. Calling from outside the
 * {@link $inspectMessage} context will cause the canister to trap.
 */
export function acceptMessage(): void {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
