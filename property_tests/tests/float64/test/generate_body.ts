import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Named } from 'azle/property_tests';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

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
