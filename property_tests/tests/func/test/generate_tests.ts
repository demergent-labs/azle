import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Func } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
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
