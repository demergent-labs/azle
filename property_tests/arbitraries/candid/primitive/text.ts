import fc from 'fast-check';
import { CandidArb } from '../candid_arb';
import { stringToSrcLiteral } from '../../../utils/to_src_literal/string';

export const TextArb = CandidArb(fc.string(), 'text', stringToSrcLiteral);
