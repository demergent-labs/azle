/**
 * Stops execution and rejects the current request with a `CANISTER_ERROR`
 * (5) rejection code and the provided message
 * @param message the rejection message
 */
export function trap(message: string): never {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        throw new Error('IC API not available');
    }

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.trap(message);
    }

    return globalThis._azleIcStable.trap(message);
}
