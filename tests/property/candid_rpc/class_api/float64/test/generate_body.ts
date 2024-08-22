import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamFloat64s: Named<CandidValueAndMeta<number>>[],
    returnFloat64: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamFloat64s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamFloat64s);

    const sum = namedParamFloat64s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnFloat64.src.valueLiteral);
    const count = namedParamFloat64s.length + 1;
    const average = `(${sum}) / ${count}`;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${average};
    `;
}
