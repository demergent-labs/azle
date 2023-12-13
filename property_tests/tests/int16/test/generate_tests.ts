import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt16s: Named<CandidValueAndMeta<number>>[],
    returnInt16: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamInt16s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt16s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt16.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt16s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        [
            {
                name: `int16 ${functionName}`,
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
