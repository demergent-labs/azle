import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInts: Named<CandidValueAndMeta<bigint>>[],
    returnInt: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnInt.value.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: deepEqual(result, expectedResult)
                    };
                }
            }
        ]
    ];
}
