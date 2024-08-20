import fc from 'fast-check';

import { Api } from '../types';
import {
    CandidValueAndMeta,
    CandidValueAndMetaArb
} from './candid_value_and_meta_arb';
import { CorrespondingJSType } from './corresponding_js_type';
import { VoidArb } from './primitive/void';

export type CandidReturnType = CorrespondingJSType | undefined;

export function CandidReturnTypeArb(
    api: Api
): fc.Arbitrary<CandidValueAndMeta<CandidReturnType>> {
    return fc.oneof(
        { arbitrary: CandidValueAndMetaArb(api), weight: 17 },
        { arbitrary: VoidArb(api), weight: 1 }
    );
}
