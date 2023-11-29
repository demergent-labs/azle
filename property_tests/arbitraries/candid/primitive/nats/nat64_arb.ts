import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';

export const Nat64Arb = SimpleCandidValueAndMetaArb(
    fc.bigUintN(64),
    CandidType.Nat64,
    bigintToSrcLiteral
);
