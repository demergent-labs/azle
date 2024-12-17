import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamInt16s: Named<CandidValueAndMeta<number>>[],
    returnInt16: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamInt16s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt16s);

    const sum = namedParamInt16s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt16.src.valueLiteral);
    const count = namedParamInt16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}
