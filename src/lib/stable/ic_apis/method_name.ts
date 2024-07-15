/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): string {
    return globalThis._azleIc ? globalThis._azleIc.methodName() : '';
}
