import fc from 'fast-check';

import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid_value_and_meta_arb';
import { VoidArb } from './primitive/void';
import { CorrespondingJSType } from './corresponding_js_type';

export type CandidReturnType = CorrespondingJSType | undefined;

export const CandidReturnTypeArb = fc.oneof(
    { arbitrary: CandidValueAndMetaArb, weight: 17 },
    { arbitrary: VoidArb, weight: 1 }
) as fc.Arbitrary<CandidValueAndMeta<CandidReturnType>>;
