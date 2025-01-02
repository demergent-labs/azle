/**
 * Stops execution and rejects the current request with a `CANISTER_ERROR` (5) rejection code.
 * This is the Internet Computer's mechanism for handling fatal errors in canister execution.
 * When called, the current execution is immediately halted and all state changes are discarded.
 *
 * @param message - The rejection message that will be returned to the caller
 * @returns never - This function never returns as it halts execution
 * @throws {Error} If called outside of the IC environment where the API is not available
 *
 * @example
 * if (invalidState) {
 *   trap("Invalid state: account balance cannot be negative");
 * }
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
