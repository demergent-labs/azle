import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNulls: Named<CandidValueAndMeta<null>>[],
    _returnNull: CandidValueAndMeta<null>
): Test[][] {
    return [
        [
            {
                name: `test ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamNulls.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(result, null);
                }
            }
        ]
    ];
}
