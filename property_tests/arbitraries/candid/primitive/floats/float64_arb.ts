import fc from 'fast-check';
import { CandidArb } from '../../../canister_arb';

export const Float64Arb = fc
    .float64Array({ maxLength: 1, minLength: 1 })
    .map((floats): CandidArb => ({ candidType: 'float64', value: floats[0] }));
