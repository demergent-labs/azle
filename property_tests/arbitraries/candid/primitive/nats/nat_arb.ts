import fc from 'fast-check';

export const NatArb = fc.bigInt({
    min: 0n
});
