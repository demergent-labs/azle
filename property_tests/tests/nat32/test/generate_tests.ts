import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat32s: Named<CandidMeta<number>>[],
    returnNat32: CandidMeta<number>
): Test[] {
    const count = namedParamNat32s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat32s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat32.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat32s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat32 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat32/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
