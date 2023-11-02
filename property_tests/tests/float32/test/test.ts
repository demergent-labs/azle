import fc from 'fast-check';

import { areFloatsEqual } from '../../../are_equal/float';
import { Float32Arb } from '../../../arbitraries/candid/primitive/floats/float32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

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
    paramFloat32s: Candid<number>[],
    returnFloat32: Candid<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const paramLiterals = paramFloat32s.map(
        (float32s) => float32s.src.valueLiteral
    );
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            const areFloat32sEqual = areFloatsEqual(
                paramName,
                paramLiterals[index]
            );
            return `if (!(${areFloat32sEqual})) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

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
    paramFloat32s: Candid<number>[],
    returnFloat32: Candid<number>
): Test {
    const expectedResult =
        paramFloat32s.length === 0
            ? returnFloat32.value
            : paramFloat32s[0].value;
    const paramValues = paramFloat32s.map((paramFloats) => paramFloats.value);
    return {
        name: `float32 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/float32/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnFloat32.equals(result, expectedResult)
            };
        }
    };
}
