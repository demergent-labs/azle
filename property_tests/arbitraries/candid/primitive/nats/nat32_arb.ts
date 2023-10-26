import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Nat32Arb = fc
    .bigUintN(32)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'nat32' })
    );
