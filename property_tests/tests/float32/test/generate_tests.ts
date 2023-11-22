import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Named } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamFloat32s: Named<CandidMeta<number>>[],
    returnFloat32: CandidMeta<number>
): Test[] {
    const expectedResult =
        namedParamFloat32s.length === 0
            ? returnFloat32.agentResponseValue
            : namedParamFloat32s[0].el.agentResponseValue;
    const paramValues = namedParamFloat32s.map(
        (paramFloats) => paramFloats.el.agentArgumentValue
    );
    return [
        {
            name: `float32 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/float32/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
