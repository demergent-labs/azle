import fc from 'fast-check';

import { IntArb } from '../../../arbitraries/candid/primitive/ints/int_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

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
    paramInts: Candid<bigint>[],
    returnInt: Candid<bigint>
): string {
    const paramsAreBigInts = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, `${returnInt.value}`);

    const paramValues = paramInts.map((sample) => sample.value);
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramValues[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${sum};
    `;
}

function generateTest(
    functionName: string,
    paramInts: Candid<bigint>[],
    returnInt: Candid<bigint>
): Test {
    const expectedResult = paramInts.reduce(
        (acc, int) => acc + int.value,
        returnInt.value
    );
    const paramValues = paramInts.map((sample) => sample.value);

    return {
        name: `int ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnInt.equals(result, expectedResult)
            };
        }
    };
}
