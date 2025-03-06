import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamVecs: Named<CandidValueAndMeta<any>>[],
    returnVec: CandidValueAndMeta<any>
): Test[][] {
    const expectedResult = returnVec.value.agentResponseValue;

    return [
        [
            {
                name: `vec ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const params = namedParamVecs.map(
                        (param) => param.value.value.agentArgumentValue
                    );
                    const result = await actor[functionName](...params);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
