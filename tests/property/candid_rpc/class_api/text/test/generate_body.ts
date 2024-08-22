import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamTexts: Named<CandidValueAndMeta<string>>[],
    returnText: CandidValueAndMeta<string>
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
