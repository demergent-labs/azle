import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNats: Named<CandidValueAndMeta<bigint>>[],
    returnNat: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamNats.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnNat.value.agentResponseValue
    );
    const paramValues = namedParamNats.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat ${functionName}`,
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
