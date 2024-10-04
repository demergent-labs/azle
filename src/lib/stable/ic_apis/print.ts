/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): void {
    if (globalThis._azleIcStable === undefined) {
        return;
    }

    return globalThis._azleIcStable.print(...args);
}
