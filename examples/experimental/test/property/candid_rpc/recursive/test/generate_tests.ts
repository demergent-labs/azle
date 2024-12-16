import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/test/property/arbitraries/candid/recursive';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamRecursive: Named<CandidValueAndMeta<Recursive>>[],
    returnRecursive: CandidValueAndMeta<Recursive>
): Test[][] {
    return [
        [
            {
                name: `recursive ${functionName}`,
                test: async (): Promise<AzleResult> => {
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
