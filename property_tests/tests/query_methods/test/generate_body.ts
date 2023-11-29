import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { CandidReturnType } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta';
import { Named } from 'azle/property_tests';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CandidReturnType>
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
}
