import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';

export const Nat64Arb = CandidArb(fc.bigUintN(64), 'nat64');
