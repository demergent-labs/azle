import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamInt64s: Named<CandidValueAndMeta<bigint>>[],
    returnInt64: CandidValueAndMeta<bigint>
): string {
    const paramsAreBigInts = namedParamInt64s
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamInt64s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt64.src.valueLiteral);
    const count = namedParamInt64s.length + 1;
    const average = `(${sum}) / ${count}n`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt64s);

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}
