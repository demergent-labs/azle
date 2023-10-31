import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';
import { floatToSrcLiteral } from '../../../../utils/to_src_literal/float';

export const Float32Arb = CandidArb(fc.float(), 'float32', floatToSrcLiteral);
