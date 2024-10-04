/**
 * Stops execution and rejects the current request with a `CANISTER_ERROR`
 * (5) rejection code and the provided message
 * @param message the rejection message
 */
export function trap(message: string): never {
    if (globalThis._azleIcStable === undefined) {
        throw new Error();
    }

    return globalThis._azleIcStable.trap(message);
}
