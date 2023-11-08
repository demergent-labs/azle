import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { BlobArb } from '../../../arbitraries/candid/constructed/blob_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const BlobTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(BlobArb),
        BlobArb
    )
    .map(
        ([
            functionName,
            paramBlobs,
            defaultReturnBlob
        ]): QueryMethodBlueprint => {
            const imports = defaultReturnBlob.src.imports;
            const paramNames = paramBlobs.map((_, index) => `param${index}`);
            const paramCandidTypes = paramBlobs
                .map((blob) => blob.src.candidType)
                .join(', ');
            const returnCandidType = defaultReturnBlob.src.candidType;
            const body = generateBody(
                paramNames,
                paramBlobs,
                defaultReturnBlob
            );
            const tests = [
                generateTest(functionName, paramBlobs, defaultReturnBlob)
            ];

            return {
                imports,
                functionName,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                tests
            };
        }
    );

runPropTests(CanisterArb(BlobTestArb));

function generateBody(
    paramNames: string[],
    paramBlobs: CandidMeta<Uint8Array>[],
    returnBlob: CandidMeta<Uint8Array>
): string {
    // TODO these checks should be much more precise probably, imagine checking the elements inside of the arrays
    const paramsAreUint8Arrays = paramNames
        .map((paramName) => {
            return `if (!(${paramName} instanceof Uint8Array)) throw new Error('${paramName} must be a Uint8Array');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramBlobs
    );

    const returnStatement = `Uint8Array.from([${[...returnBlob.value]} ${
        returnBlob.value.length > 0 ? ',' : ''
    } ${paramNames.map((paramName) => `...${paramName}`).join(', ')}])`;

    return `
        ${paramsAreUint8Arrays}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramBlobs: CandidMeta<Uint8Array>[],
    returnBlob: CandidMeta<Uint8Array>
): Test {
    const expectedResult = Uint8Array.from(
        paramBlobs
            .map((blob) => blob.value)
            .reduce((acc, blob) => [...acc, ...blob], [...returnBlob.value])
    );

    return {
        name: `blob ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/blob/test');

            const result = await actor[functionName](
                ...paramBlobs.map((blob) => blob.value)
            );

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
