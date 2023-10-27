import { CandidArb } from '../../candid_arb';
import { UNumberArb } from './index';

export const Nat16Arb = CandidArb(UNumberArb(16), 'nat16');
