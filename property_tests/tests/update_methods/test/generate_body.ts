import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { BodyGenerator } from 'azle/property_tests/arbitraries/canister_methods';
import { CandidReturnType } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';

export const generateBody: BodyGenerator<
    CandidType,
    CandidReturnType,
    CandidType,
    CandidReturnType
> = (namedParams, returnType): string => {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
};
