import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamInt32s: Named<CandidValueAndMeta<number>>[],
    returnInt32: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamInt32s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamInt32s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt32.src.valueLiteral);
    const count = namedParamInt32s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt32s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}
