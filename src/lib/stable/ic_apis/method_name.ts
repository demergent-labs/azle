/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): string {
    if (globalThis._azleIcStable === undefined) {
        return '';
    }

    return globalThis._azleIcStable.methodName();
}
