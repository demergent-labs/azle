import fc from 'fast-check';
import { CandidArb } from '../candid_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';

export const NullArb = CandidArb(fc.constant(null), 'Null', nullToSrcLiteral);
