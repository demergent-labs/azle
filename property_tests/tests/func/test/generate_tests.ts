import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamFuncs: Named<CandidValueAndMeta<Func>>[],
    returnFunc: CandidValueAndMeta<Func>
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
