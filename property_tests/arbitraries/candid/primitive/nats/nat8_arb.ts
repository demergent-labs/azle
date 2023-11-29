import { numberToSrcLiteral } from '../../to_src_literal/number';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidClass } from '../../candid_class';

export const Nat8Arb = PrimitiveCandidValueAndMetaArb(
    UNumberArb(8),
    CandidClass.Nat8,
    numberToSrcLiteral
);
