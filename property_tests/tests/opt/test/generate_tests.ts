import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Opt } from 'azle/property_tests/arbitraries/candid/constructed/opt_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamOpts: Named<CandidValueAndMeta<Opt>>[],
    returnOpt: CandidValueAndMeta<Opt>
): Test[][] {
    const expectedResult = returnOpt.value.agentResponseValue;

    return [
        [
            {
                name: `opt ${functionName}`,
                test: async () => {
                    const actor = getActor(__dirname);

                    const params = namedParamOpts.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[functionName](...params);

                    return {
                        Ok: deepEqual(expectedResult, result)
                    };
                }
            }
        ]
    ];
}
