import fc from 'fast-check';

export const NumberArb = (n: number) =>
    fc.bigIntN(n).map((value) => Number(value));
