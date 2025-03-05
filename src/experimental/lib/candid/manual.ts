import '../experimental';

import { CandidType } from './candid_type';
import { AzleVoid } from './types/primitive/void';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function Manual(candidType: CandidType): typeof AzleVoid {
    return candidType as unknown as typeof AzleVoid;
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
// To achieve the developer facing type inference API we often introduce type
// parameters that are used by the consumer of the function but not by the
// function itself
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Manual<T extends CandidType> = void;
