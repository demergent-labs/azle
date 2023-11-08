import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { BodyGenerator } from 'azle/property_tests/arbitraries/query_method_arb';

export const generateBody: BodyGenerator<CandidType, CandidType> = (
    namedParams,
    returnType
): string => {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
};
