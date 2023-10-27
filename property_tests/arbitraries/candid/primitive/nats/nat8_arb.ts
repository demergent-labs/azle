import fc from 'fast-check';
import { Candid } from '../..';

export const Nat8Arb = fc.bigUintN(8).map(
    (value): Candid<number> => ({
        value: Number(value),
        src: { candidType: 'nat8', imports: new Set(['nat8']) }
    })
);
