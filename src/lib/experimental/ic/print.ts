import '../experimental';

import { Void } from '../candid/types/primitive/void';

/**
 * Prints the given message
 * @param args the message to print
 */
export function print(...args: any): Void {
    if (globalThis._azleIcExperimental === undefined) {
        return undefined;
    }

    globalThis._azleIcExperimental.print(...args);
}
