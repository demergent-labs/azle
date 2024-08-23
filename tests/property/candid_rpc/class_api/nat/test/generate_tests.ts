import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNats: Named<CandidValueAndMeta<bigint>>[],
    returnNat: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamNats.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnNat.value.agentResponseValue
    );
    const paramValues = namedParamNats.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
