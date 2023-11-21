import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { BlobArb } from '../../../arbitraries/candid/constructed/blob_arb';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';

const AllBlobsQueryMethod = QueryMethodArb(fc.array(BlobArb), BlobArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllBlobsQueryMethod));

function generateBody(
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

function generateTests(
    functionName: string,
    paramBlobs: Named<CandidMeta<Uint8Array>>[],
    returnBlob: CandidMeta<Uint8Array>
): Test[] {
    const expectedResult = Uint8Array.from(
        paramBlobs
            .map((blob) => blob.el.agentResponseValue)
            .reduce(
                (acc, blob) => [...acc, ...blob],
                [...returnBlob.agentResponseValue]
            )
    );

    return [
        {
            name: `blob ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/blob/test');

                const result = await actor[functionName](
                    ...paramBlobs.map((blob) => blob.el.agentArgumentValue)
                );

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
