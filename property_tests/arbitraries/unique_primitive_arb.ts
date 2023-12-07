import fc from 'fast-check';

// TODO I think all callers of createUniquePrimitiveArb will use the same Set
// TODO this doesn't seem right, instead I think they should pass in a set of their own
let samples = new Set();

export function createUniquePrimitiveArb<T>(arb: fc.Arbitrary<T>) {
    return arb
        .filter((primitiveSample) => !samples.has(primitiveSample))
        .map((primitiveSample) => {
            samples.add(primitiveSample);
            return primitiveSample;
        });
}

export function clear() {
    samples = new Set();
}
