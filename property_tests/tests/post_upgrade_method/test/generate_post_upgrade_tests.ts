import { deepEqual, Named, getActor } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { Test } from 'azle/test';

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
                test: async () => {
                    const actor = getActor('./tests/post_upgrade_method/test');
                    const result = await actor.getPostUpgradeValues();

                    const isInitCalled = await actor.isInitCalled();
                    const InitHookExecuted = await actor.getInitHookExecuted();
                    const wasInitCalled = isInitCalled && InitHookExecuted;

                    const valuesAreEqual =
                        deepEqual(result, expectedResult) &&
                        wasInitCalled === false;

                    return valuesAreEqual
                        ? { Ok: true }
                        : {
                              Err: `\n Incorrect return value\n   expected: ${expectedResult}\n   received: ${result}`
                          };
                }
            }
        ]
    ];
}
