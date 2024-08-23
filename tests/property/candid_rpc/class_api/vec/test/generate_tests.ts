import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

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
                    const actor = getActor(__dirname);

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
