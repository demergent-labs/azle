import fc from 'fast-check';
import { CandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export const VoidArb = CandidValueAndMetaArb(
    fc.constant(undefined),
    'Void',
    voidToSrcLiteral
);
