import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/experimental/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
