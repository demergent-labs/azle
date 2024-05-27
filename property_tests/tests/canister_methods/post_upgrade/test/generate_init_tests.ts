import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { Test, testEquality } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const initValues = await actor.getInitValues();
                    const isPostUpgradeCalled =
                        await actor.isPostUpgradeCalled();

                    return testEquality(
                        [initValues, isPostUpgradeCalled],
                        [expectedResult, false]
                    );
                }
            }
        ]
    ];
}
