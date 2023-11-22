import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { getActor, runPropTests } from '../../..';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { FuncArb, Func } from '../../../arbitraries/candid/reference/func_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllFuncsQueryMethod = QueryMethodArb(
    fc.uniqueArray(FuncArb, {
        selector: (entry) => entry.src.candidType
    }),
    FuncArb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllFuncsQueryMethod));

function generateBody(
    namedParamFuncs: Named<CandidMeta<Func>>[],
    returnFunc: CandidMeta<Func>
): string {
    const paramsAreFuncs = namedParamFuncs
        .map(({ name }) => {
            const paramIsArray = `Array.isArray(${name})`;
            const paramHas2Fields = `${name}.length === 2`;
            const field0IsAPrincipal = `${name}[0]._isPrincipal === true`;
            const field1IsAString = `typeof ${name}[1] === 'string'`;

            const paramIsAFunc = [
                paramIsArray,
                paramHas2Fields,
                field0IsAPrincipal,
                field1IsAString
            ].join(' && ');

            const throwError = `throw new Error('${name} must be a Func');`;

            return `if (!(${paramIsAFunc})) ${throwError}`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamFuncs);

    const returnStatement = returnFunc.src.valueLiteral;

    return `
        ${paramsAreFuncs}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTests(
    functionName: string,
    namedParamFuncs: Named<CandidMeta<Func>>[],
    returnFunc: CandidMeta<Func>
): Test[] {
    return [
        {
            name: `func ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/func/test');

                const result = await actor[functionName](
                    ...namedParamFuncs.map(
                        (param) => param.el.agentArgumentValue
                    )
                );

                return {
                    Ok: deepEqual(result, returnFunc.agentResponseValue)
                };
            }
        }
    ];
}
