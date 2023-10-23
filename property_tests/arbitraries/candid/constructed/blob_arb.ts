import fc from 'fast-check';

export const BlobArb = fc.tuple(
    fc.uint8Array(),
    fc.oneof(fc.constant('blob'), fc.constant('Vec(nat8)'))
);
