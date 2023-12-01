import fc from 'fast-check';

import { CandidMeta } from './candid_arb';
import { CandidType, CandidTypeArb } from './candid_type_arb';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CandidType | undefined;

export const CandidReturnTypeArb = fc.oneof(
    { arbitrary: CandidTypeArb, weight: 17 },
    { arbitrary: VoidArb, weight: 1 }
) as fc.Arbitrary<CandidMeta<CandidReturnType>>;
