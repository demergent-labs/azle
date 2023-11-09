import { CandidMeta } from './arbitraries/candid/candid_arb';
import { CandidType } from './arbitraries/candid/candid_type_arb';
import { Named } from './arbitraries/query_method_arb';

export function areParamsCorrectlyOrdered<T extends CandidType>(
    params: Named<CandidMeta<T>>[]
) {
    return params
        .map(({ name, el }) => {
            const areEqual = `deepEqual(
                ${name},
                ${el.src.valueLiteral}
            )`;

            return `if (!${areEqual}) throw new Error('${name} is incorrectly ordered')`;
        })
        .join('\n');
}
