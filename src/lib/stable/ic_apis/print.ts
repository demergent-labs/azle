/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): void {
    return globalThis._azleIc ? globalThis._azleIc.print(...args) : undefined;
}
