/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export function reject(message: string): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.reject(message);
        return;
    }

    globalThis._azleIcStable.reject(message);
}
