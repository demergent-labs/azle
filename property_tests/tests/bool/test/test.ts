import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { BoolArb } from '../../../arbitraries/candid/primitive/bool';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';

const AllBoolsQueryMethod = QueryMethodArb(fc.array(BoolArb), BoolArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllBoolsQueryMethod));

function generateBody(
    namedParamBools: Named<CandidMeta<boolean>>[],
    returnBool: CandidMeta<boolean>
): string {
    // TODO do we want to encapsulate 'boolean' in the CandidArb? Like an agentType instead of a candidType, like azleValue and agentValue?
    // TODO or will this not matter anymore once we start using a deep equal library
    const paramsAreBooleans = namedParamBools
        .map((param) => {
            return `if (typeof ${param.name} !== 'boolean') throw new Error('${param.name} must be a boolean');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamBools);

    const returnStatement = namedParamBools.reduce((acc, { name }) => {
        return `${acc} && ${name}`;
    }, returnBool.src.valueLiteral);

    return `
        ${paramsAreBooleans}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTests(
    functionName: string,
    namedParamBools: Named<CandidMeta<boolean>>[],
    returnBool: CandidMeta<boolean>
): Test[] {
    const expectedResult = namedParamBools.reduce(
        (acc, param) => acc && param.el.agentResponseValue,
        returnBool.agentResponseValue
    );
    const paramValues = namedParamBools.map(
        (param) => param.el.agentArgumentValue
    );

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
