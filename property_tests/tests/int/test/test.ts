import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { IntArb } from '../../../arbitraries/candid/primitive/ints/int_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const IntTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(IntArb),
        IntArb
    )
    .map(([functionName, paramInts, defaultReturnInt]): TestSample => {
        const imports = defaultReturnInt.src.imports;

        const paramNames = paramInts.map((_, index) => `param${index}`);
        const paramCandidTypes = paramInts
            .map((int) => int.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnInt.src.candidType;

        const body = generateBody(paramNames, paramInts, defaultReturnInt);

        const test = generateTest(functionName, paramInts, defaultReturnInt);

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

runPropTests(IntTestArb);

function generateBody(
    paramNames: string[],
    paramInts: CandidMeta<bigint>[],
    returnInt: CandidMeta<bigint>
): string {
    const paramsAreBigInts = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnInt.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramInts
    );

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${sum};
    `;
}

function generateTest(
    functionName: string,
    paramInts: CandidMeta<bigint>[],
    returnInt: CandidMeta<bigint>
): Test {
    const expectedResult = paramInts.reduce(
        (acc, int) => acc + int.agentResponseValue,
        returnInt.agentResponseValue
    );
    const paramValues = paramInts.map((sample) => sample.agentArgumentValue);

    return {
        name: `int ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
