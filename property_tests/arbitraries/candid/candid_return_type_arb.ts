import fc from 'fast-check';

import { CandidValueAndMeta } from './candid_value_and_meta';
import { CorrespondingJSType, CandidValueAndMetaArb } from './candid_type_arb';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CorrespondingJSType | undefined;

export const CandidReturnTypeArb = fc.oneof(
    { arbitrary: CandidValueAndMetaArb, weight: 17 },
    { arbitrary: VoidArb, weight: 1 }
) as fc.Arbitrary<CandidValueAndMeta<CandidReturnType>>;
