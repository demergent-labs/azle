import fc from 'fast-check';
import { CorrespondingJSType } from '../candid_type_arb';
import { CandidValues } from '../candid_meta_arb';

export function SimpleCandidValueArb<T extends CorrespondingJSType>(
    arb: fc.Arbitrary<T>,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValues<T>> {
    return arb.map((value): CandidValues<T> => {
        return {
            valueLiteral: toLiteral(value),
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}
