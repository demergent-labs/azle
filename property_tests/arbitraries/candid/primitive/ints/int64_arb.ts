import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';
import { bigintToSrcLiteral } from '../../../../utils/to_src_literal/bigint';

export const Int64Arb = CandidArb(fc.bigIntN(64), 'int64', bigintToSrcLiteral);
