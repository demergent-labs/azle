import '#experimental/build/assert_experimental';

import fc from 'fast-check';

export const UNumberArb = (depthLevel: number): fc.Arbitrary<number> =>
    fc
        .bigInt({
            min: 0n,
            max: 2n ** BigInt(depthLevel) - 1n
        })
        .map((value: bigint) => Number(value));
