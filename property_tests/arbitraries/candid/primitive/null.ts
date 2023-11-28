import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';

export const NullArb = CandidValueAndMetaArb(
    fc.constant(null),
    'Null',
    nullToSrcLiteral
);
