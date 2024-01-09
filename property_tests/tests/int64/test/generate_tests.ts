import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt64s: Named<CandidValueAndMeta<bigint>>[],
    returnInt64: CandidValueAndMeta<bigint>
): Test[][] {
    const count = namedParamInt64s.length + 1;
    const expectedResult =
        namedParamInt64s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnInt64.value.agentResponseValue
        ) / BigInt(count);

    const paramValues = namedParamInt64s.map(
        (param) => param.value.value.agentArgumentValue
    );
    return [
        [
            {
                name: `int64 ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: deepEqual(result, expectedResult)
                    };
                }
            }
        ]
    ];
}
