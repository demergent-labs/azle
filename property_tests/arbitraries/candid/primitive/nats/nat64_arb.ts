import fc from 'fast-check';

export const Nat64Arb = fc.bigUintN(64);
