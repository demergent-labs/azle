import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNulls: Named<CandidValueAndMeta<null>>[],
    _returnNull: CandidValueAndMeta<null>
): Test[][] {
    return [
        [
            {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamNulls.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return {
                        Ok: deepEqual(result, null)
                    };
                }
            }
        ]
    ];
}
