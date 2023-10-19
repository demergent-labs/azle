import fc from 'fast-check';

let samples = new Set();

export function createUniquePrimitiveArb(arb: fc.Arbitrary<any>) {
    return arb
        .filter((primitiveSample) => !samples.has(primitiveSample))
        .map((primitiveSample) => {
            samples.add(primitiveSample);
            return primitiveSample;
        });
}
