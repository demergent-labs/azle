/**
 * Accepts an ingress message during message inspection.
 *
 * @returns void
 *
 * @remarks
 *
 * - Traps if invoked twice
 *
 * - **Call Context**:
 *   - \@inspectMessage
 */
export function acceptMessage(): void {
    if (globalThis._azleIcExperimental === undefined) {
        return;
    }

    globalThis._azleIcExperimental.acceptMessage();
}
