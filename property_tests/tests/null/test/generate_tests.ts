import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNulls: Named<CandidMeta<null>>[],
    _returnNull: CandidMeta<null>
): Test[] {
    return [
        {
            name: `test ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/null/test');

                const result = await actor[functionName](
                    ...namedParamNulls.map(
                        (param) => param.el.agentArgumentValue
                    )
                );

                return {
                    Ok: deepEqual(result, null)
                };
            }
        }
    ];
}
