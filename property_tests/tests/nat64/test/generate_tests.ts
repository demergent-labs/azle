import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat64s: Named<CandidMeta<bigint>>[],
    returnNat64: CandidMeta<bigint>
): Test[] {
    const count = namedParamNat64s.length + 1;
    const expectedResult =
        namedParamNat64s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat64.agentResponseValue
        ) / BigInt(count);
    const paramValues = namedParamNat64s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat64 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat64/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
