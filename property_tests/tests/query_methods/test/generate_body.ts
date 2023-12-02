import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { BodyGenerator } from 'azle/property_tests/arbitraries/query_method_arb';
import { CandidReturnType } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests';

export function generateBody(
    namedParams: Named<CandidMeta<CandidType>>[],
    returnType: CandidMeta<CandidReturnType>
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
}
