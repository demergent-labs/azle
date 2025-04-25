import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Recursive } from 'azle/experimental/_internal/test/property/arbitraries/candid/recursive';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);

                    const params = namedParamRecursive.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](...params);

                    return candidTestEquality(
                        result,
                        returnRecursive.value.agentResponseValue
                    );
                }
            }
        ]
    ];
}
