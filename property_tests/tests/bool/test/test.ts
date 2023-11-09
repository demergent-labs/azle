import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { BoolArb } from '../../../arbitraries/candid/primitive/bool';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { QueryMethodArb } from '../../../arbitraries/query_method_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';

const AllBoolQueryMethod = QueryMethodArb(fc.array(BoolArb), BoolArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllBoolQueryMethod));

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

function generateTests(
    functionName: string,
    paramBools: CandidMeta<boolean>[],
    returnBool: CandidMeta<boolean>
): Test[] {
    const expectedResult = paramBools.reduce(
        (acc, bool) => acc && bool.value,
        returnBool.value
    );
    const paramValues = paramBools.map((bool) => bool.value);

    return [
        {
            name: `bool ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/bool/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
