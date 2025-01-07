/**
 * Returns the name of the method being called.
 *
 * @returns The name of the current method, or empty string if called outside the IC environment
 *
 * @remarks
 * - **Call Context**:
 *   - inspectMessage
 * - **When called outside of Call Context**:
 *   - Traps
 */
export function methodName(): string {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return '';
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.methodName();
    }

    return globalThis._azleIcStable.methodName();
}
