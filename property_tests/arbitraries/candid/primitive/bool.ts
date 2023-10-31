import fc from 'fast-check';
import { CandidArb } from '../candid_arb';
import { booleanToSrcLiteral } from '../../../utils/to_src_literal/boolean';

export const BoolArb = CandidArb(fc.boolean(), 'bool', booleanToSrcLiteral);
