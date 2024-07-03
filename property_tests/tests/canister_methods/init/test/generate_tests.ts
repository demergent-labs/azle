import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

export function generateTests(
    _functionName: string,
    params: Named<CandidValueAndMeta<CorrespondingJSType>>[]
): Test[][] {
    const expectedResult = [
        true,
        ...params.map((param) => param.value.value.agentResponseValue)
    ];

    return [
        [
            {
                name: `init method`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);
                    const result = await actor.getInitValues();

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
