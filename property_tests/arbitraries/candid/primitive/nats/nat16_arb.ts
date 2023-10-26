import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Nat16Arb = fc
    .bigUintN(16)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'nat16' })
    );
