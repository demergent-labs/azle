import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';

export const IntArb = CandidArb(fc.bigInt(), 'int', bigintToSrcLiteral);
