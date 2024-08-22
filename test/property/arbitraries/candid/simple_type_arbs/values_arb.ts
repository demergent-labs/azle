import fc from 'fast-check';

import { CandidValues } from '../candid_values_arb';
import { CorrespondingJSType } from '../corresponding_js_type';

export function SimpleCandidValuesArb<T extends CorrespondingJSType>(
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
