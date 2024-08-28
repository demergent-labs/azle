import '../experimental';

import { empty } from '../candid/types/primitive/empty';
import { text } from '../candid/types/primitive/text';

/**
 * Stops execution and rejects the current request with a `CANISTER_ERROR`
 * (5) rejection code and the provided message
 * @param message the rejection message
 */
export function trap(message: text): empty {
    if (globalThis._azleIc === undefined) {
        throw new Error();
    }

    return globalThis._azleIc.trap(message);
}
