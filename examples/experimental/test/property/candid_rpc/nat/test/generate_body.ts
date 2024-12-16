import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamNats: Named<CandidValueAndMeta<bigint>>[],
    returnNat: CandidValueAndMeta<bigint>
): string {
    const paramsAreBigInts = namedParamNats
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamNats.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNats);

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreBigInts}

        return ${sum};
    `;
}
