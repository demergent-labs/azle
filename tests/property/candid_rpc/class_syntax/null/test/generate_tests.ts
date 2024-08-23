import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

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
