import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Float32Arb = fc
    .float()
    .map((value): CandidArb => ({ candidType: 'float32', value }));
