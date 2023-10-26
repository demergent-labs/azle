import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Nat64Arb = fc
    .bigUintN(64)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'nat64' })
    );
