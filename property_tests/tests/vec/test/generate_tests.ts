import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const params = namedParamVecs.map(
                        (param) => param.value.value.agentArgumentValue
                    );
                    const result = await actor[functionName](...params);

                    return {
                        Ok: deepEqual(result, expectedResult)
                    };
                }
            }
        ]
    ];
}
