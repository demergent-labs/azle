import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';

export const BoolArb = PrimitiveCandidValueAndMetaArb(
    fc.boolean(),
    'bool',
    booleanToSrcLiteral
);
