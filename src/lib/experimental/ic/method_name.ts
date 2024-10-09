import '../experimental';

import { text } from '../candid/types/primitive/text';

/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): text {
    if (globalThis._azleIcExperimental === undefined) {
        return '';
    }

    return globalThis._azleIcExperimental.methodName();
}
