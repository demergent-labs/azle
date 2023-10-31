import { numberToSrcLiteral } from '../../../../utils/to_src_literal/number';
import { CandidArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat8Arb = CandidArb(UNumberArb(8), 'nat8', numberToSrcLiteral);
