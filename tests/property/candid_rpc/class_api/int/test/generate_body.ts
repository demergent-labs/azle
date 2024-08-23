import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamInts: Named<CandidValueAndMeta<bigint>>[],
    returnInt: CandidValueAndMeta<bigint>
): string {
    const paramsAreBigInts = namedParamInts
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamInts.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInts);

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${sum};
    `;
}
