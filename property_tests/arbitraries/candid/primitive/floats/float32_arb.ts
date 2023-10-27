import fc from 'fast-check';
import { Candid } from '../..';

export const Float32Arb = fc.float().map(
    (value): Candid<number> => ({
        src: { candidType: 'float32', imports: new Set(['float32']) },
        value
    })
);
