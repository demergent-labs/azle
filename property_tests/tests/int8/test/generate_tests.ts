import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt8s: Named<CandidMeta<number>>[],
    returnInt8: CandidMeta<number>
): Test[] {
    const count = namedParamInt8s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt8s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt8.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt8s.map(
        (param) => param.el.agentArgumentValue
    );
    return [
        {
            name: `test ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int8/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
