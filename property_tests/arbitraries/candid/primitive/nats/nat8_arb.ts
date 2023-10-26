import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Nat8Arb = fc
    .bigUintN(8)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'nat8' })
    );
