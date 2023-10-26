import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const NatArb = fc
    .bigUint()
    .map((sample): CandidArb => ({ value: Number(sample), candidType: 'nat' }));
