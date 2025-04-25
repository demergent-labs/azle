import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);
                    const result = await actor.getInitValues();

                    return candidTestEquality(result, expectedResult);
                }
            }
        ]
    ];
}
