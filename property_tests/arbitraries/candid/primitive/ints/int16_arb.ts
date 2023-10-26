import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Int16Arb = fc
    .bigIntN(16)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'int16' })
    );
