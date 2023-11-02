import fc from 'fast-check';
import { deepEqual } from 'fast-equals';
import { CandidType } from './candid_type_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidMeta<T extends CandidType> = {
    value: T;
    src: {
        candidType: string;
        typeDeclaration?: string;
        imports: Set<string>;
        valueLiteral: string;
    };
    equals(a: T, b: T): boolean;
};

export const CandidMetaArb = <T extends CandidType>(
    arb: fc.Arbitrary<T>,
    candidType: string,
    toLiteral: (value: T) => string,
    equals: (a: T, b: T) => boolean = (a: T, b: T) => deepEqual(a, b)
) => {
    return arb.map(
        (value): CandidMeta<T> => ({
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
