import { Void } from '../candid/types/primitive/void';

/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): Void {
    return globalThis._azleIc ? globalThis._azleIc.print(...args) : undefined;
}
