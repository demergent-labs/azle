import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/property_tests/arbitraries/candid/recursive';
import { Test, testEquality } from 'azle/property_tests/test';

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
                    const actor = getActor(__dirname);

                    const params = namedParamRecursive.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[functionName](...params);

                    return testEquality(
                        result,
                        returnRecursive.value.agentResponseValue
                    );
                }
            }
        ]
    ];
}
