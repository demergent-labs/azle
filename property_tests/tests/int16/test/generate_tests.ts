import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test, testEquality } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamInt16s: Named<CandidValueAndMeta<number>>[],
    returnInt16: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamInt16s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt16s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnInt16.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt16s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int16 ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](...paramValues);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
