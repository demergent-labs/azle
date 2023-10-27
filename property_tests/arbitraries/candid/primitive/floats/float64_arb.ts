import fc from 'fast-check';
import { CandidArb } from '../../candid_arb';

export const Float64Arb = CandidArb(
    fc.float64Array({ maxLength: 1, minLength: 1 }).map((sample) => sample[0]),
    'float32'
);
