import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';

export const Float32Arb = CandidArb(fc.float(), 'float32');
