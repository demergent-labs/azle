import { text } from '../candid/types/primitive/text';

/**
 * Returns the name of the current canister methods
 * @returns the current canister method
 */
export function methodName(): text {
    return globalThis._azleIc
        ? globalThis._azleIc.methodName()
        : (undefined as any);
}
