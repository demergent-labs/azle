import fc from 'fast-check';
import { Candid } from './';
import { deepEqual } from 'fast-equals';

export const CandidArb = <T>(
    arb: fc.Arbitrary<T>,
    candidType: string,
    equals: (a: T, b: T) => boolean = (a: T, b: T) => deepEqual(a, b)
) => {
    return arb.map(
        (value): Candid<T> => ({
            src: { candidType, imports: new Set([candidType]) },
            value,
            equals
        })
    );
};
