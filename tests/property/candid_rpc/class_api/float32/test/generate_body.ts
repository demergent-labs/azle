import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamFloat32s: Named<CandidValueAndMeta<number>>[],
    returnFloat32: CandidValueAndMeta<number>
): string {
    const paramsAreNumbers = namedParamFloat32s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamFloat32s);

    const returnStatement =
        namedParamFloat32s.length === 0
            ? returnFloat32.src.valueLiteral
            : namedParamFloat32s[0].name;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${returnStatement};
    `;
}
