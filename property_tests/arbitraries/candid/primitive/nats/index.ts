import fc from 'fast-check';

export const UNumberArb = (n: number) =>
    fc.bigUintN(n).map((value) => Number(value));
