/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): string {
    if (globalThis._azleIc === undefined) {
        return '';
    }

    return globalThis._azleIc.methodName();
}
