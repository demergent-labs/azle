import fc from 'fast-check';

import { VecArb } from '../../../arbitraries/candid/constructed/vec_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const VecTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(VecArb))
    .map(([functionName, vecWrappers]): TestSample => {
        const paramCandidTypes = vecWrappers.map(
            (vecWrapper) => vecWrapper.src.candidType
        );
        const returnCandidType = vecWrappers[0]?.src?.candidType ?? 'Vec(int8)';
        const paramNames = vecWrappers.map((_, index) => `param${index}`);

        // TODO these checks should be much more precise probably, imagine checking the elements inside of the arrays
        const paramsAreArrays = paramNames
            .map((paramName) => {
                return `if (!Array.isArray(${paramName}) && !ArrayBuffer.isView(${paramName})) throw new Error('${paramName} must be an array');`;
            })
            .join('\n');

        // TODO this ordering check is not perfect
        // TODO but turning the vec into a string seems a bit difficult...we need to figure out how to check perfectly for the values that we want
        // TODO maybe a global variable that we can write into and call would work
        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName}.length !== ${vecWrappers[index].value.length}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        const returnStatement = paramNames[0] ?? `[]`;

        const expectedResult = vecWrappers[0]?.value ?? [];

        const equalityCheck =
            vecWrappers[0]?.equalityCheck ?? ((a, b) => a === b);

        const imports = Array.from(
            vecWrappers.reduce((acc, vecWrapper) => {
                return new Set([...acc, ...vecWrapper.src.imports]);
            }, new Set<string>())
        );

        return {
            functionName,
            imports,
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreArrays}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/vec/test');

                    console.log(JSON.stringify(expectedResult, replacer));
                    const params = vecWrappers.map(
                        (vecWrapper) => vecWrapper.value
                    );
                    console.log(JSON.stringify(params, replacer));
                    const result = await actor[functionName](...params);
                    console.log(JSON.stringify(result, replacer));

                    return {
                        Ok: primitiveArraysAreEqual(
                            result,
                            expectedResult,
                            equalityCheck
                        )
                    };
                }
            }
        };
    });

runPropTests(VecTestArb);

function replacer(key: any, value: any): any {
    if (typeof value === 'bigint') {
        return value.toString() + 'n';
    }

    return value;
}

function primitiveArraysAreEqual(
    arr1: any,
    arr2: any,
    equalityCheck: (a: any, b: any) => boolean
) {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Loop through each element to check for equality
    for (let i = 0; i < arr1.length; i++) {
        if (!equalityCheck(arr1[i], arr2[i])) {
            return false;
        }
    }

    return true;
}
