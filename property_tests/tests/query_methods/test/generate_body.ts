import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { BodyGenerator } from 'azle/property_tests/arbitraries/query_method_arb';

export const generateBody: BodyGenerator<
    CorrespondingJSType,
    CorrespondingJSType
> = (namedParams, returnType): string => {
    const paramsAreCorrectlyOrdered = areParamsCorrectlyOrdered(namedParams);

    return `
        ${paramsAreCorrectlyOrdered}

        return ${returnType.src.valueLiteral}
    `;
};
