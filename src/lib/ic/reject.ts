import { text } from '../candid/types/primitive/text';
import { Void } from '../candid/types/primitive/void';

/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export function reject(message: text): Void {
    throw new Error(
        'This function should not be called directly. It is implemented directly on the ic object'
    );
}
