import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';
import { CandidType } from '../candid_type';

export const NullArb = SimpleCandidValueAndMetaArb(
    fc.constant(null),
    CandidType.Null,
    nullToSrcLiteral
);
