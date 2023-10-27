import fc from 'fast-check';
import { CandidArb } from '../candid_arb';

export const BoolArb = CandidArb(fc.boolean(), 'bool');
