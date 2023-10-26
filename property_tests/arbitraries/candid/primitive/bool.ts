import fc from 'fast-check';
import { CandidArb } from '../../canister_arb';

export const BoolArb = fc
    .boolean()
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'bool' })
    );
