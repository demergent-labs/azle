import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Int8Arb = fc
    .bigIntN(8)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'int8' })
    );
