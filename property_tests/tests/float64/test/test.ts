import fc from 'fast-check';

import { areFloatsEqual } from '../../../are_equal/float';
import { Float64Arb } from '../../../arbitraries/candid/primitive/floats/float64_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

const Float64TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Float64Arb),
        Float64Arb
    )
    .map(([functionName, paramFloat64s, defaultReturnFloat64]): TestSample => {
        const imports = defaultReturnFloat64.src.imports;

        const paramNames = paramFloat64s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramFloat64s
            .map((float64) => float64.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnFloat64.src.candidType;

        const body = generateBody(
            paramNames,
            paramFloat64s,
            defaultReturnFloat64
        );

        const test = generateTest(
            functionName,
            paramFloat64s,
            defaultReturnFloat64
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

runPropTests(Float64TestArb);

function generateBody(
    paramNames: string[],
    paramFloat64s: Candid<number>[],
    returnFloat64: Candid<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const paramValues = paramFloat64s.map((float64) => float64.value);
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            const areFloat64sEqual = areFloatsEqual(
                paramName,
                paramValues[index]
            );
            return `if (!(${areFloat64sEqual})) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, `${returnFloat64.value}`);
    const count = paramFloat64s.length + 1;
    const average = `(${sum}) / ${count}`;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramFloat64s: Candid<number>[],
    returnFloat64: Candid<number>
): Test {
    const count = paramFloat64s.length + 1;
    const expectedResult =
        paramFloat64s.reduce(
            (acc, float64) => acc + float64.value,
            returnFloat64.value
        ) / count;

    const paramValues = paramFloat64s.map((float64) => float64.value);

    return {
        name: `float64 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/float64/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnFloat64.equals(result, expectedResult)
            };
        }
    };
}
