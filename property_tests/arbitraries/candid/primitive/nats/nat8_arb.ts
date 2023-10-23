import fc from 'fast-check';

export const Nat8Arb = fc.bigUintN(8).map((sample) => Number(sample));
