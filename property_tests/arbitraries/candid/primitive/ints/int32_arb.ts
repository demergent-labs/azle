import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Int32Arb = fc
    .bigIntN(32)
    .map(
        (sample): CandidArb => ({ value: Number(sample), candidType: 'int32' })
    );
