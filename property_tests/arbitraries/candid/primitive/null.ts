import fc from 'fast-check';
import { CandidArb } from '../../canister_arb';

export const NullArb = fc
    .constant(null)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'Null' })
    );
