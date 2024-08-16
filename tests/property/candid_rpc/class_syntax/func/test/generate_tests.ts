import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/property_tests/arbitraries/candid/reference/func_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

export function generateTests(
    functionName: string,
    namedParamFuncs: Named<CandidValueAndMeta<Func>>[],
    returnFunc: CandidValueAndMeta<Func>
): Test[][] {
    return [
        [
            {
                name: `func ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamFuncs.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(
                        result,
                        returnFunc.value.agentResponseValue
                    );
                }
            }
        ]
    ];
}
