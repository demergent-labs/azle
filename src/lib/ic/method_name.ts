/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): string {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
