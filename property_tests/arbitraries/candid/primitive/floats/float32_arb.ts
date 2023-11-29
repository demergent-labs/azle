import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { CandidClass } from '../../candid_meta_arb';

export const Float32Arb = PrimitiveCandidValueAndMetaArb(
    fc.float(),
    CandidClass.Float32,
    floatToSrcLiteral
);
