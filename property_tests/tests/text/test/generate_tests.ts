import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test, testEquality } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
