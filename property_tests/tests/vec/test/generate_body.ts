import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamVecs: Named<CandidMeta<any>>[],
    returnVec: CandidMeta<any>
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
