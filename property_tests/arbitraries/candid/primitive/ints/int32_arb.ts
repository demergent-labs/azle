import fc from 'fast-check';
import { Candid } from '../..';

export const Int32Arb = fc.bigIntN(32).map(
    (value): Candid<number> => ({
        value: Number(value),
        meta: { candidType: 'int32' }
    })
);
