import fc from 'fast-check';
import { Candid } from '../..';

export const Float32Arb = fc
    .float()
    .map(
        (value): Candid<number> => ({ meta: { candidType: 'float32' }, value })
    );
