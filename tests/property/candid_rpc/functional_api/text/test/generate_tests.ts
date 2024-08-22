import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamTexts: Named<CandidValueAndMeta<string>>[],
    returnTexts: CandidValueAndMeta<string>
): Test[][] {
    const expectedResult = namedParamTexts.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnTexts.value.agentResponseValue
    );
    const paramValues = namedParamTexts.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `text ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
