import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    _functionName: string,
    params: Named<CandidValueAndMeta<CorrespondingJSType>>[]
): Test[][] {
    const expectedResult = [
        true,
        ...params.map((param) => param.value.value.agentResponseValue)
    ];

    return [
        [], // Don't test on the first deploy, test after a re-deploy
        [
            {
                name: `post upgrade method`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const postUpgradeValues =
                        await actor.getPostUpgradeValues();
                    const isInitCalled = await actor.isInitCalled();

                    return candidTestEquality(
                        [postUpgradeValues, isInitCalled],
                        [expectedResult, false]
                    );
                }
            }
        ]
    ];
}
