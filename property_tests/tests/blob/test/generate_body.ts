import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { areParamsCorrectlyOrdered } from 'azle/property_tests/are_params_correctly_ordered';

export function generateBody(
    namedParamBlobs: Named<CandidMeta<Uint8Array>>[],
    returnBlob: CandidMeta<Uint8Array>
): string {
    // TODO these checks should be much more precise probably, imagine checking the elements inside of the arrays
    const paramsAreUint8Arrays = namedParamBlobs
        .map((param) => {
            return `if (!(${param.name} instanceof Uint8Array)) throw new Error('${param.name} must be a Uint8Array');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamBlobs);

    const returnStatement = `Uint8Array.from([${[
        ...returnBlob.agentArgumentValue
    ]} ${returnBlob.agentArgumentValue.length > 0 ? ',' : ''} ${namedParamBlobs
        .map((param) => `...${param.name}`)
        .join(', ')}])`;

    return `
        ${paramsAreUint8Arrays}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
