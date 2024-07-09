import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

export function generateTests(
    functionName: string,
    namedParamFloat32s: Named<CandidValueAndMeta<number>>[],
    returnFloat32: CandidValueAndMeta<number>
): Test[][] {
    const expectedResult =
        namedParamFloat32s.length === 0
            ? returnFloat32.value.agentResponseValue
            : namedParamFloat32s[0].value.value.agentResponseValue;
    const paramValues = namedParamFloat32s.map(
        (paramFloats) => paramFloats.value.value.agentArgumentValue
    );
    return [
        [
            {
                name: `float32 ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
