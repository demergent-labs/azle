import fc from 'fast-check';

import { Context } from '../types';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid_value_and_meta_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CorrespondingJSType | undefined;

export function CandidReturnTypeArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<CandidReturnType>> {
    return fc.oneof(
        { arbitrary: CandidValueAndMetaArb(context), weight: 17 },
        { arbitrary: VoidArb(context), weight: 1 }
    );
}
