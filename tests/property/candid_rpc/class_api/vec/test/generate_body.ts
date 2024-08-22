import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamVecs: Named<CandidValueAndMeta<any>>[],
    returnVec: CandidValueAndMeta<any>
): string {
    const paramsAreArrays = namedParamVecs
        .map((param) => {
            return `if (!Array.isArray(${param.name}) && !ArrayBuffer.isView(${param.name})) throw new Error('${param.name} must be an array');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamVecs);

    const returnValue = returnVec.src.valueLiteral;

    return `
        ${paramsAreArrays}

        ${paramsCorrectlyOrdered}

        return ${returnValue};
    `;
}
