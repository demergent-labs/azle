import fc from 'fast-check';
import { CandidArb } from '../candid_arb';

export const NullArb = CandidArb(fc.constant(null), 'Null');
