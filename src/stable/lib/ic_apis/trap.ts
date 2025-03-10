/**
 * Terminates the current call with an error message.
 *
 * @param message - The reject message that will be returned to the caller
 *
 * @returns never - This function never returns as it halts execution
 *
 * @remarks
 *
 * - Immediately stops execution
 * - Produces a `CANISTER_ERROR` (5) reject code
 * - Discards all state changes in the current call
 *
 * - **Call Context**:
 *   - any
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
