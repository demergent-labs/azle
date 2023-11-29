import fc from 'fast-check';
import { PrimitiveCandidValueAndMetaArb } from '../candid_value_and_meta_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export const VoidArb = PrimitiveCandidValueAndMetaArb(
    fc.constant(undefined),
    'Void',
    voidToSrcLiteral
);
