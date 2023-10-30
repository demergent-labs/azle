import fc from 'fast-check';

import { Int64Arb } from '../../../arbitraries/candid/primitive/ints/int64_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

const Int64TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Int64Arb),
        Int64Arb
    )
    .map(([functionName, paramInt64s, defaultReturnInt64]): TestSample => {
        const imports = defaultReturnInt64.src.imports;

        const paramNames = paramInt64s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramInt64s
            .map((int64) => int64.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnInt64.src.candidType;

        const body = generateBody(paramNames, paramInt64s, defaultReturnInt64);

        const test = generateTest(
            functionName,
            paramInt64s,
            defaultReturnInt64
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

runPropTests(Int64TestArb);

function generateBody(
    paramNames: string[],
    paramInt64s: Candid<bigint>[],
    returnInt64: Candid<bigint>
): string {
    const paramsAreBigInts = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, `${returnInt64.value}`);
    const count = paramInt64s.length + 1;
    const average = `(${sum}) / ${count}n`;

    const paramValues = paramInt64s.map((sample) => sample.value);

    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramValues[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramInt64s: Candid<bigint>[],
    returnInt64: Candid<bigint>
): Test {
    const count = paramInt64s.length + 1;
    const expectedResult =
        paramInt64s.reduce(
            (acc, int64) => acc + int64.value,
            returnInt64.value
        ) / BigInt(count);

    const paramValues = paramInt64s.map((sample) => sample.value);
    return {
        name: `int64 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int64/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: result === expectedResult
            };
        }
    };
}
