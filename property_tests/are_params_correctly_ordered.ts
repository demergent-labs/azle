import { CandidMeta } from './arbitraries/candid/candid_arb';
import { CandidType } from './arbitraries/candid/candid_type_arb';

export function areParamsCorrectlyOrdered<T extends CandidType>(
    paramNames: string[],
    params: CandidMeta<T>[]
) {
    return paramNames
        .map((paramName, index) => {
            const areEqual = `deepEqual(
                ${paramName},
                ${params[index].src.valueLiteral}
            )`;

            return `if (!${areEqual}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');
}
