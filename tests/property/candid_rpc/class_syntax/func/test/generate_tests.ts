import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/test/property/arbitraries/candid/reference/func_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

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
