import { getActor, Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);

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
