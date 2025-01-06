/**
 * Terminates the current call with an error message.
 *
 * @param message - The rejection message that will be returned to the caller
 * @returns never - This function never returns as it halts execution
 * @throws {Error} If called outside of the IC environment where the API is not available
 *
 * @remarks
 * - Immediately stops execution
 * - Produces a `CANISTER_ERROR` (5) rejection code
 * - Discards all state changes in current call
 * - Message appears in error logs
 * - **Call Context**:
 *   - Any method
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
