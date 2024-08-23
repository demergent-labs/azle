import fc from 'fast-check';

export const NumberArb = (depthLevel: number): fc.Arbitrary<number> =>
    fc.bigIntN(depthLevel).map((value) => Number(value));
