import { Named } from 'azle/test/property';
import { CandidReturnType } from 'azle/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

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
