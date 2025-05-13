import '#experimental/build/assert_experimental';

import fc from 'fast-check';

export const NumberArb = (depthLevel: number): fc.Arbitrary<number> =>
    fc
        .bigInt({
            min: -(2n ** BigInt(depthLevel - 1)),
            max: 2n ** BigInt(depthLevel - 1) - 1n
        })
        .map((value) => Number(value));
