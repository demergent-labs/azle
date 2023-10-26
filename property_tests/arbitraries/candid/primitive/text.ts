import fc from 'fast-check';
import { CandidArb } from '../../canister_arb';

export const TextArb = fc
    .string()
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'text' })
    );
