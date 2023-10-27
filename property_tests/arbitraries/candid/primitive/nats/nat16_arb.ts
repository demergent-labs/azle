import fc from 'fast-check';
import { Candid } from '../..';

export const Nat16Arb = fc.bigUintN(16).map(
    (value): Candid<number> => ({
        value: Number(value),
        src: { candidType: 'nat16', imports: new Set(['nat16']) }
    })
);
