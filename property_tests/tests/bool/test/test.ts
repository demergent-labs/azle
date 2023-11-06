import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { BoolArb } from '../../../arbitraries/candid/primitive/bool';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const BoolTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(BoolArb),
        BoolArb
    )
    .map(([functionName, paramBools, defaultReturnBool]): TestSample => {
        const imports = defaultReturnBool.src.imports;

        const paramNames = paramBools.map((_, index) => `param${index}`);
        const paramCandidTypes = paramBools
            .map((bool) => bool.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnBool.src.candidType;

        const body = generateBody(paramNames, paramBools, defaultReturnBool);

        const test = generateTest(functionName, paramBools, defaultReturnBool);

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

runPropTests(BoolTestArb);

function generateBody(
    paramNames: string[],
    paramBools: CandidMeta<boolean>[],
    returnBool: CandidMeta<boolean>
): string {
    // TODO do we want to encapsulate 'boolean' in the CandidArb? Like an agentType instead of a candidType, like azleValue and agentValue?
    // TODO or will this not matter anymore once we start using a deep equal library
    const paramsAreBooleans = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'boolean') throw new Error('${paramName} must be a boolean');`;
        })
        .join('\n');

    const paramLiterals = paramBools.map((bool) => bool.src.valueLiteral);
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramLiterals[index]}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    const returnStatement = paramNames.reduce((acc, paramName) => {
        return `${acc} && ${paramName}`;
    }, returnBool.src.valueLiteral);

    return `
        ${paramsAreBooleans}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramBools: CandidMeta<boolean>[],
    returnBool: CandidMeta<boolean>
): Test {
    const expectedResult = paramBools.reduce(
        (acc, bool) => acc && bool.value,
        returnBool.value
    );
    const paramValues = paramBools.map((bool) => bool.value);

    return {
        name: `bool ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/bool/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
