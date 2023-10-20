import fc from 'fast-check';

export const Int8Arb = fc.bigIntN(8).map((sample) => Number(sample));
