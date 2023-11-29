import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidClass } from '../../candid_class';

export const Int64Arb = PrimitiveCandidValueAndMetaArb(
    fc.bigIntN(64),
    CandidClass.Int64,
    bigintToSrcLiteral
);
