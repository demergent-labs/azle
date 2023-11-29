import fc from 'fast-check';
import { OldSimpleCandidValueAndMetaArb } from '../simple_type_arbs/old_value_and_meta_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export const VoidArb = OldSimpleCandidValueAndMetaArb(
    fc.constant(undefined),
    'Void',
    new Set(['Void']),
    voidToSrcLiteral
);
