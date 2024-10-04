/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): void {
    if (globalThis._azleIc === undefined) {
        return;
    }

    return globalThis._azleIc.print(...args);
}
