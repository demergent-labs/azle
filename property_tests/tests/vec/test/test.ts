import fc from 'fast-check';

import { VecArb } from '../../../arbitraries/candid/constructed/vec_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { deepEqual } from 'fast-equals';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const VecTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(VecArb),
        VecArb
    )
    .map(([functionName, paramVecs, defaultReturnVec]): TestSample => {
        const imports = new Set([
            ...paramVecs.flatMap((vec) => [...vec.src.imports]),
            ...defaultReturnVec.src.imports
        ]);

        const paramNames = paramVecs.map((_, index) => `param${index}`);
        const paramCandidTypes = paramVecs.map((vec) => vec.src.candidType);

        const returnCandidType =
            paramVecs[0]?.src?.candidType ?? defaultReturnVec.src.candidType;

        const body = generateBody(paramNames, paramVecs, defaultReturnVec);

        const test = generateTest(functionName, paramVecs, defaultReturnVec);

        return {
            functionName,
            imports,
            paramCandidTypes: paramCandidTypes.join(', '),
            returnCandidType,
            paramNames,
            body,
            test
        };
    });

runPropTests(VecTestArb);

function generateBody(
    paramNames: string[],
    paramVecs: CandidMeta<any>[],
    returnVec: CandidMeta<any>
): string {
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
            return `if (${paramName}.length !== ${paramVecs[index].value.length}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    const returnValue = paramNames[0] ?? returnVec.src.valueLiteral;

    return `
        ${paramsAreArrays}

        ${paramsCorrectlyOrdered}

        return ${returnValue};
    `;
}

function generateTest(
    functionName: string,
    paramVecs: CandidMeta<any>[],
    returnVec: CandidMeta<any>
): Test {
    const expectedResult = paramVecs[0]?.value ?? returnVec.value;

    return {
        name: `vec ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/vec/test');

            const params = paramVecs.map((vec) => [...vec.value]);
            const result = await actor[functionName](...params);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
