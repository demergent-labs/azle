import { CandidArb } from '../../candid_arb';
import { NumberArb } from './';

export const Int8Arb = CandidArb(NumberArb(8), 'int8');
