import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../../candid_value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidClass } from '../../candid_class';

export const Nat64Arb = PrimitiveCandidValueAndMetaArb(
    fc.bigUintN(64),
    CandidClass.Nat64,
    bigintToSrcLiteral
);
