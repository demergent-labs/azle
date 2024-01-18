import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat8s: Named<CandidValueAndMeta<number>>[],
    returnNat8: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat8s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat8s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat8.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat8s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat8 ${functionName}`,
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
