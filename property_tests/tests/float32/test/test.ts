import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Float32Arb } from '../../../arbitraries/candid/primitive/floats/float32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const Float32TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Float32Arb),
        Float32Arb
    )
    .map(([functionName, paramFloat32s, defaultReturnFloat32]): TestSample => {
        const imports = defaultReturnFloat32.src.imports;

        const paramNames = paramFloat32s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramFloat32s
            .map((float32) => float32.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnFloat32.src.candidType;

        const body = generateBody(
            paramNames,
            paramFloat32s,
            defaultReturnFloat32
        );

        const test = generateTest(
            functionName,
            paramFloat32s,
            defaultReturnFloat32
        );

        return {
            imports,
            functionName,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(Float32TestArb);

function generateBody(
    paramNames: string[],
    paramFloat32s: CandidMeta<number>[],
    returnFloat32: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramFloat32s
    );

    const returnStatement =
        paramFloat32s.length === 0
            ? returnFloat32.src.valueLiteral
            : paramNames[0];

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramFloat32s: CandidMeta<number>[],
    returnFloat32: CandidMeta<number>
): Test {
    const expectedResult =
        paramFloat32s.length === 0
            ? returnFloat32.agentResponseValue
            : paramFloat32s[0].agentResponseValue;
    const paramValues = paramFloat32s.map(
        (paramFloats) => paramFloats.agentArgumentValue
    );
    return {
        name: `float32 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/float32/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
