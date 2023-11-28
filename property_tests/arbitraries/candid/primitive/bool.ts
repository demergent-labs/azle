import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';

export const BoolArb = CandidValueAndMetaArb(
    fc.boolean(),
    'bool',
    booleanToSrcLiteral
);
