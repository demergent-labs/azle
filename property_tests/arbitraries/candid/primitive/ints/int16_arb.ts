import { CandidArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int16Arb = CandidArb(NumberArb(16), 'int16');
