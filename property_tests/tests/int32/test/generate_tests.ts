import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt32s: Named<CandidValueAndMeta<number>>[],
    returnInt32: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamInt32s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt32s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt32.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt32s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        [
            {
                name: `int32 ${functionName}`,
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
