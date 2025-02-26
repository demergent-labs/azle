import { Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/_internal/test/property/are_params_correctly_ordered';
import { Recursive } from 'azle/_internal/test/property/recursive';

export function generateBody(
    namedParamRecursive: Named<CandidValueAndMeta<Recursive>>[],
    returnRecursive: CandidValueAndMeta<Recursive>
): string {
    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamRecursive);

    const returnStatement = returnRecursive.src.valueLiteral;

    return `
        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
