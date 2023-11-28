import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Int8Arb } from '../../../arbitraries/candid/primitive/ints/int8_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const Int8TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Int8Arb),
        Int8Arb
    )
    .map(([functionName, paramInt8s, defaultReturnInt8]): TestSample => {
        const imports = defaultReturnInt8.src.imports;

        const paramNames = paramInt8s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramInt8s
            .map((int8) => int8.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnInt8.src.candidType;

        const body = generateBody(paramNames, paramInt8s, defaultReturnInt8);

        const test = generateTest(functionName, paramInt8s, defaultReturnInt8);

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

runPropTests(Int8TestArb);

function generateBody(
    paramNames: string[],
    paramInt8s: CandidMeta<number>[],
    returnInt8: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnInt8.src.valueLiteral);
    const count = paramInt8s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramInt8s
    );

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramInt8s: CandidMeta<number>[],
    returnInt8: CandidMeta<number>
): Test {
    const count = paramInt8s.length + 1;
    const expectedResult = Math.floor(
        paramInt8s.reduce(
            (acc, int8) => acc + int8.agentResponseValue,
            returnInt8.agentResponseValue
        ) / count
    );
    const paramValues = paramInt8s.map((sample) => sample.agentArgumentValue);
    return {
        name: `test ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int8/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
