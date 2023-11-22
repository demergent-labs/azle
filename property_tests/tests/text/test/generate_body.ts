import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamTexts: Named<CandidMeta<string>>[],
    returnText: CandidMeta<string>
): string {
    const paramsAreStrings = namedParamTexts
        .map((param) => {
            return `if (typeof ${param.name} !== 'string') throw new Error('${param.name} must be a string');`;
        })
        .join('\n');

    const returnStatement = namedParamTexts.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnText.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamTexts);

    return `
        ${paramsAreStrings}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
