import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat32s: Named<CandidValueAndMeta<number>>[],
    returnNat32: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat32s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat32s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat32.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat32s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat32 ${functionName}`,
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
