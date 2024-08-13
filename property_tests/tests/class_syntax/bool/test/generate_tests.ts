import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

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
