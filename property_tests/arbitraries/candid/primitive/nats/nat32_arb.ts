import fc from 'fast-check';

export const Nat32Arb = fc.bigUintN(32).map((sample) => Number(sample));
