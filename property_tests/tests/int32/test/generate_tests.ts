import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

export function generateTests(
    functionName: string,
    namedParamInt32s: Named<CandidValueAndMeta<number>>[],
    returnInt32: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamInt32s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt32s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnInt32.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt32s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int32 ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
