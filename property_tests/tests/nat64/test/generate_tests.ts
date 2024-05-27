import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test, testEquality } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat64s: Named<CandidValueAndMeta<bigint>>[],
    returnNat64: CandidValueAndMeta<bigint>
): Test[][] {
    const count = namedParamNat64s.length + 1;
    const expectedResult =
        namedParamNat64s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat64.value.agentResponseValue
        ) / BigInt(count);
    const paramValues = namedParamNat64s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat64 ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
