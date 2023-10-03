/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export function reject(message: string): void {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
