import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/property_tests/arbitraries/candid/recursive';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

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
