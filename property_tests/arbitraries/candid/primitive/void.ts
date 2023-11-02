import fc from 'fast-check';
import { CandidArb } from '../candid_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export const VoidArb = CandidArb(
    fc.constant(undefined),
    'Void',
    voidToSrcLiteral
);
