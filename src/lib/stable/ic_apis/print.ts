/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any[]): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return;
    }

    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.print(...args);
        return;
    }

    globalThis._azleIcStable.print(...args);
}
