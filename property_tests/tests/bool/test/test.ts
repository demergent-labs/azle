import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { BoolArb } from '../../../arbitraries/candid/primitive/bool';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const BoolTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(BoolArb),
        BoolArb
    )
    .map(
        ([
            functionName,
            paramBools,
            defaultReturnBool
        ]): QueryMethodBlueprint => {
            const imports = defaultReturnBool.src.imports;

            const paramNames = paramBools.map((_, index) => `param${index}`);
            const paramCandidTypes = paramBools
                .map((bool) => bool.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnBool.src.candidType;

            const body = generateBody(
                paramNames,
                paramBools,
                defaultReturnBool
            );

            const tests = [
                generateTest(functionName, paramBools, defaultReturnBool)
            ];

            return {
                imports,
                functionName,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                tests
            };
        }
    );

runPropTests(CanisterArb(BoolTestArb));

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

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramBools
    );

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
