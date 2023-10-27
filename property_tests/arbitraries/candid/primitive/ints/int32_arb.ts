import fc from 'fast-check';
import { Candid } from '../..';

export const Int32Arb = fc.bigIntN(32).map(
    (value): Candid<number> => ({
        value: Number(value),
        src: { candidType: 'int32', imports: new Set(['int32']) }
    })
);
