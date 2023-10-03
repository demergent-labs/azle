import { text } from '../candid/types/primitive/text';
import { Void } from '../candid/types/primitive/void';

/**
 * Rejects the current call with the provided message
 * @param message the rejection message
 */
export const reject = (message: text) => Void;
