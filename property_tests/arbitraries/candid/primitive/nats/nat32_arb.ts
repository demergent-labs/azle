import fc from 'fast-check';
import { Candid } from '../..';

export const Nat32Arb = fc.bigUintN(32).map(
    (value): Candid<number> => ({
        value: Number(value),
        meta: { candidType: 'nat32' }
    })
);
