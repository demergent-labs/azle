import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamBools: Named<CandidValueAndMeta<boolean>>[],
    returnBool: CandidValueAndMeta<boolean>
): Test[][] {
    const expectedResult = namedParamBools.reduce(
        (acc, param) => acc && param.el.agentResponseValue,
        returnBool.agentResponseValue
    );
    const paramValues = namedParamBools.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        [
            {
                name: `bool ${functionName}`,
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
