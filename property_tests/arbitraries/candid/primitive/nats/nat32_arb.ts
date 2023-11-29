import { numberToSrcLiteral } from '../../to_src_literal/number';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { UNumberArb } from './index';

export const Nat32Arb = PrimitiveCandidValueAndMetaArb(
    UNumberArb(32),
    'nat32',
    numberToSrcLiteral
);
