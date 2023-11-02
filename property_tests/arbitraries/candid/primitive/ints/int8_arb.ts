import { numberToSrcLiteral } from '../../to_src_literal/number';
import { CandidMetaArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int8Arb = CandidMetaArb(NumberArb(8), 'int8', numberToSrcLiteral);
