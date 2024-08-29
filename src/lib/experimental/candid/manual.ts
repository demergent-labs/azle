import '../experimental';

import { CandidType } from './candid_type';
import { AzleVoid } from './types/primitive/void';

export function Manual(candidType: CandidType): typeof AzleVoid {
    return candidType as unknown as typeof AzleVoid;
}

// To achieve the developer facing type inference API we often introduce type
// parameters that are used by the consumer of the function but not by the
// function itself
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Manual<T extends CandidType> = void;
