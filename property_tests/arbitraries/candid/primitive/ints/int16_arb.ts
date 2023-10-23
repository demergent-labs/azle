import fc from 'fast-check';

export const Int16Arb = fc.bigIntN(16).map((sample) => Number(sample));
