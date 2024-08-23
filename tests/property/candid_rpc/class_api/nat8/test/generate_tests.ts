import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNat8s: Named<CandidValueAndMeta<number>>[],
    returnNat8: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat8s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat8s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat8.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat8s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat8 ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
