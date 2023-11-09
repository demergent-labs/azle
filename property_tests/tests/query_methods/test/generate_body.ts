import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';

export function generateBody(
    paramNames: string[],
    params: CandidMeta<CandidType>[],
    returnType: CandidMeta<CandidType>
): string {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        params
    );

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
}
