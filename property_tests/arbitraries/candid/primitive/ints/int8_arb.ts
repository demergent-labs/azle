import fc from 'fast-check';
import { Candid } from '../..';

export const Int8Arb = fc.bigIntN(8).map(
    (sample): Candid<number> => ({
        value: Number(sample),
        src: { candidType: 'int8', imports: new Set(['int8']) }
    })
);
