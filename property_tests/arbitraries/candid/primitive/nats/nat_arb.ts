import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';

export const NatArb = CandidArb(fc.bigUint(), 'nat');
