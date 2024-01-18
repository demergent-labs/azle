import { getActor, Named, deepEqual } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/property_tests/arbitraries/candid/recursive';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamRecursive: Named<CandidValueAndMeta<Recursive>>[],
    returnRecursive: CandidValueAndMeta<Recursive>
): Test[][] {
    return [
        [
            {
                name: `recursive ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/recursive/test');

                    const params = namedParamRecursive.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[functionName](...params);

                    return {
                        Ok: deepEqual(
                            result,
                            returnRecursive.value.agentResponseValue
                        )
                    };
                }
            }
        ]
    ];
}
