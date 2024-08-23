import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamInt8s: Named<CandidValueAndMeta<number>>[],
    returnInt8: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamInt8s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt8s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnInt8.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt8s.map(
        (param) => param.value.value.agentArgumentValue
    );
    return [
        [
            {
                name: `test ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
