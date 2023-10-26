import fc from 'fast-check';
import { Candid } from '../..';

export const Float64Arb = fc.float64Array({ maxLength: 1, minLength: 1 }).map(
    (floats): Candid<number> => ({
        meta: { candidType: 'float64' },
        value: floats[0]
    })
);
