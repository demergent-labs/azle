import { CandidType } from './candid_type';
import { AzleVoid } from './types/primitive/void';

export function Manual(candidType: CandidType): typeof AzleVoid {
    return candidType as unknown as typeof AzleVoid;
}

export type Manual<T extends CandidType> = void;
