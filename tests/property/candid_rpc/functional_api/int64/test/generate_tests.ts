import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

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
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
