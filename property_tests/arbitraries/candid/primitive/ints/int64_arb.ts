import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';

export const Int64Arb = CandidArb(fc.bigIntN(64), 'int64');
