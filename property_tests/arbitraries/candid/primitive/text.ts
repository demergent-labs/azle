import fc from 'fast-check';
import { CandidArb } from '../candid_arb';

export const TextArb = CandidArb(fc.string(), 'text');
