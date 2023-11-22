import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNats: Named<CandidMeta<bigint>>[],
    returnNat: CandidMeta<bigint>
): Test[] {
    const expectedResult = namedParamNats.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnNat.agentResponseValue
    );
    const paramValues = namedParamNats.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
