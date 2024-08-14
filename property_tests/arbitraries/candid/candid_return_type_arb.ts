import fc from 'fast-check';

import { Syntax } from '../types';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid_value_and_meta_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CorrespondingJSType | undefined;

export function CandidReturnTypeArb(
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<CandidReturnType>> {
    return fc.oneof(
        { arbitrary: CandidValueAndMetaArb(syntax), weight: 17 },
        { arbitrary: VoidArb(syntax), weight: 1 }
    );
}
