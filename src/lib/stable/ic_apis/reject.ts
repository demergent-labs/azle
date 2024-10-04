/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export function reject(message: string): void {
    if (globalThis._azleIc === undefined) {
        return;
    }
    return globalThis._azleIc.reject(message);
}
