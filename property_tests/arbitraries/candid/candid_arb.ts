import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type Candid<T> = {
    value: T;
    src: {
        candidType: string;
        typeDeclaration?: string;
        imports: Set<string>;
        valueLiteral: string;
    };
    equals(a: T, b: T): boolean;
};

export const CandidArb = <T>(
    arb: fc.Arbitrary<T>,
    candidType: string,
    toLiteral: (value: T) => string,
    equals: (a: T, b: T) => boolean = (a: T, b: T) => deepEqual(a, b)
) => {
    return arb.map(
        (value): Candid<T> => ({
            src: {
                candidType,
                imports: new Set([candidType]),
                valueLiteral: toLiteral(value)
            },
            value,
            equals
        })
    );
};
