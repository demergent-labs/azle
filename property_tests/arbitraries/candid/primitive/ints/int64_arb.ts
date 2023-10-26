import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Int64Arb = fc
    .bigIntN(64)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'int64' })
    );
