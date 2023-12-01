import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat8s: Named<CandidMeta<number>>[],
    returnNat8: CandidMeta<number>
): Test[] {
    const count = namedParamNat8s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat8s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat8.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat8s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat8 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat8/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
