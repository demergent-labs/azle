import fc from 'fast-check';
import { Candid } from '../..';

export const Float64Arb = fc.float64Array({ maxLength: 1, minLength: 1 }).map(
    (floats): Candid<number> => ({
        src: { candidType: 'float64', imports: new Set(['float64']) },
        value: floats[0]
    })
);
