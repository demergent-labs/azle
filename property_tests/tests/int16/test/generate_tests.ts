import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt16s: Named<CandidMeta<number>>[],
    returnInt16: CandidMeta<number>
): Test[] {
    const count = namedParamInt16s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt16s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt16.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt16s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `int16 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int16/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
