import fc from 'fast-check';
import { CandidMetaArb } from '../candid_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export const VoidArb = CandidMetaArb(
    fc.constant(undefined),
    'Void',
    'Void',
    voidToSrcLiteral
);
