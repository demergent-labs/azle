import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';

export const Int64Arb = SimpleCandidValueAndMetaArb(
    fc.bigIntN(64),
    CandidType.Int64,
    bigintToSrcLiteral
);
