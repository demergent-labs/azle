import fc from 'fast-check';

export const Int32Arb = fc.bigIntN(32).map((sample) => Number(sample));
