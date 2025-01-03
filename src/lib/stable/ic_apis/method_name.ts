/**
 * Returns the name of the current canister method being executed.
 * Only available within an {@link inspectMessage} function.
 *
 * @returns The name of the current method, or empty string if called outside the IC environment
 *
 * @remarks
 * - Only callable within an {@link inspectMessage} function
 * - Will trap if called outside inspect message
 * - Used to implement method-level access control
 * - Returns empty string ('') if called outside the IC environment
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
