import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamBlobs: Named<CandidValueAndMeta<Uint8Array>>[],
    returnBlob: CandidValueAndMeta<Uint8Array>
): string {
    // TODO these checks should be much more precise probably, imagine checking the elements inside of the arrays
    const paramsAreUint8Arrays = namedParamBlobs
        .map((param) => {
            return `if (!(${param.name} instanceof Uint8Array)) throw new Error('${param.name} must be a Uint8Array');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamBlobs);

    const returnValue = returnBlob.value.agentArgumentValue;

    const returnStatement = `Uint8Array.from([${[...returnValue]} ${
        returnValue.length > 0 ? ',' : ''
    } ${namedParamBlobs.map((param) => `...${param.name}`).join(', ')}])`;

    return `
        ${paramsAreUint8Arrays}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
