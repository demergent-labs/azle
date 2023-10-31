import { numberToSrcLiteral } from '../../../../utils/to_src_literal/number';
import { CandidArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat32Arb = CandidArb(UNumberArb(32), 'nat32', numberToSrcLiteral);
