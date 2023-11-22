import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt64s: Named<CandidMeta<bigint>>[],
    returnInt64: CandidMeta<bigint>
): Test[] {
    const count = namedParamInt64s.length + 1;
    const expectedResult =
        namedParamInt64s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt64.agentResponseValue
        ) / BigInt(count);

    const paramValues = namedParamInt64s.map(
        (param) => param.el.agentArgumentValue
    );
    return [
        {
            name: `int64 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int64/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
