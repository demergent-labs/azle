import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamFloat32s: Named<CandidValueAndMeta<number>>[],
    returnFloat32: CandidValueAndMeta<number>
): Test[][] {
    const expectedResult =
        namedParamFloat32s.length === 0
            ? returnFloat32.agentResponseValue
            : namedParamFloat32s[0].el.agentResponseValue;
    const paramValues = namedParamFloat32s.map(
        (paramFloats) => paramFloats.el.agentArgumentValue
    );
    return [
        [
            {
                name: `float32 ${functionName}`,
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
