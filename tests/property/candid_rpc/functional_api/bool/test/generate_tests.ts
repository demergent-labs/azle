import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamBools: Named<CandidValueAndMeta<boolean>>[],
    returnBool: CandidValueAndMeta<boolean>
): Test[][] {
    const expectedResult = namedParamBools.reduce(
        (acc, param) => acc && param.value.value.agentResponseValue,
        returnBool.value.agentResponseValue
    );
    const paramValues = namedParamBools.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `bool ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
