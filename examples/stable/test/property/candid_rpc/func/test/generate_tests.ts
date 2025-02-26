import { getActor, Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Func } from 'azle/_internal/test/property/func_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);

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
