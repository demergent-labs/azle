import { numberToSrcLiteral } from '../../to_src_literal/number';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { NumberArb } from './';
import { CandidClass } from '../../candid_meta_arb';

export const Int8Arb = PrimitiveCandidValueAndMetaArb(
    NumberArb(8),
    CandidClass.Int8,
    numberToSrcLiteral
);
