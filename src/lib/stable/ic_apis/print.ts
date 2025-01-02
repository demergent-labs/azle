/**
 * Prints a message to the replica log output for debugging purposes.
 *
 * @param message - The string message to print to the replica logs
 * @returns void, or no effect if called outside the IC environment
 *
 * @example
 * print("Debug: processing transaction");
 *
 * @remarks
 * - Only visible in replica logs, not to end users
 * - Useful for development and debugging
 */
export function print(message: string): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.print(message);
        return;
    }

    globalThis._azleIcStable.print(message);
}
