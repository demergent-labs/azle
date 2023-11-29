import { numberToSrcLiteral } from '../../to_src_literal/number';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { NumberArb } from './';
import { CandidClass } from '../../candid_meta_arb';

export const Int32Arb = PrimitiveCandidValueAndMetaArb(
    NumberArb(32),
    CandidClass.Int32,
    numberToSrcLiteral
);
