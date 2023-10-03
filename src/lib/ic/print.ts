import { Void } from '../candid/types/primitive/void';

/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): Void {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
