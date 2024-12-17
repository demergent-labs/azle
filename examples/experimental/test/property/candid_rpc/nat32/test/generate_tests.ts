import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNat32s: Named<CandidValueAndMeta<number>>[],
    returnNat32: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat32s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat32s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat32.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat32s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat32 ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
