import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamInts: Named<CandidValueAndMeta<bigint>>[],
    returnInt: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnInt.value.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
