import fc from 'fast-check';

export const UNumberArb = (depthLevel: number): fc.Arbitrary<number> =>
    fc.bigUintN(depthLevel).map((value) => Number(value));
