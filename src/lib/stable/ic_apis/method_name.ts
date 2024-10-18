/**
 * Returns the name of the current canister method
 * @returns the current canister method name
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
