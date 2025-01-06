/**
 * Prints a message to the replica log output.
 *
 * @param message - The message to print
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - Used for debugging and logging
 * - Output appears in replica logs, not to end users
 * - Returns void if called outside IC environment
 * - **Call Context**:
 *   - Any method
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
