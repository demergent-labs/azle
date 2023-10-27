import fc from 'fast-check';

import { VecArb } from '../../../arbitraries/candid/constructed/vec_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const VecTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(VecArb))
    .map(([functionName, vecs]): TestSample => {
        const paramCandidTypes = vecs.map((vec) => vec.src.candidType);
        const returnCandidType = vecs[0]?.src?.candidType ?? 'Vec(nat8)';
        const paramNames = vecs.map((_, index) => `param${index}`);

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
                return `if (${paramName}.length !== ${vecs[index].value.length}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        const returnStatement = paramNames[0] ?? `new Uint8Array()`;

        const expectedResult = vecs[0]?.value ?? [];

        const equalityCheck = (a: any, b: any) => a === b;

        const imports = Array.from(
            vecs.reduce((acc, vec) => {
                return new Set([...acc, ...vec.src.imports]);
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

                    const params = vecs.map((vec) => vec.value);
                    const result = await actor[functionName](...params);

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
