import fc from 'fast-check';

import { CandidValueAndMeta } from './candid_value_and_meta_arb';
import { CandidType, CandidTypeArb } from './candid_type_arb';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CandidType | undefined;

export const CandidReturnTypeArb = fc.oneof(
    { arbitrary: CandidTypeArb, weight: 17 },
    { arbitrary: VoidArb, weight: 1 }
) as fc.Arbitrary<CandidValueAndMeta<CandidReturnType>>;
