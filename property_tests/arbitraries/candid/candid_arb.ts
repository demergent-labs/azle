import fc from 'fast-check';
import { Candid } from './';

export const CandidArb = <T>(arb: fc.Arbitrary<T>, candidType: string) => {
    return arb.map(
        (value): Candid<T> => ({
            src: { candidType, imports: new Set([candidType]) },
            value
        })
    );
};
