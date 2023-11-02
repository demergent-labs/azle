import fc from 'fast-check';
import { CandidMetaArb } from '../candid_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';

export const BoolArb = CandidMetaArb(fc.boolean(), 'bool', booleanToSrcLiteral);
