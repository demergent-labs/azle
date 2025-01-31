/**
 * Returns the name of the method being called during message inspection.
 *
 * @returns The name of the method
 *
 * @remarks
 *
 * - **Call Context**:
 *   - \@inspectMessage
 */
export function msgMethodName(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.msgMethodName();
    }

    return globalThis._azleIcStable.msgMethodName();
}
