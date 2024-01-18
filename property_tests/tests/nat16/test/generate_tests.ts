import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamNat16s: Named<CandidValueAndMeta<number>>[],
    returnNat16: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat16s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat16s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat16.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat16s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat16 ${functionName}`,
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
