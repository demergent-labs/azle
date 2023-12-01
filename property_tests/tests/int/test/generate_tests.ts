import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInts: Named<CandidMeta<bigint>>[],
    returnInt: CandidMeta<bigint>
): Test[] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnInt.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `int ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
