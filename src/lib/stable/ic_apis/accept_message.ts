/**
 * Accepts an ingress message during message inspection.
 *
 * @returns void
 *
 * @remarks
 *
 * - Traps if invoked twice
 * - **Call Context**:
 *   - \@inspectMessage
 * - **Outside of Call Context**:
 *   - traps
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
