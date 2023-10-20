import fc from 'fast-check';

export const Nat16Arb = fc.bigUintN(16).map((sample) => Number(sample));
