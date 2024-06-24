/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export function reject(message: string): void {
    return globalThis._azleIc ? globalThis._azleIc.reject(message) : undefined;
}
