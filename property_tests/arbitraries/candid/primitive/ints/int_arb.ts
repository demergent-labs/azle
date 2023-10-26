import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const IntArb = fc
    .bigInt()
    .map((sample): CandidArb => ({ value: Number(sample), candidType: 'int' }));
