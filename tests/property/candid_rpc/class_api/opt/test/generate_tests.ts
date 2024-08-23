import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Opt } from 'azle/test/property/arbitraries/candid/constructed/opt_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

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
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);

                    const params = namedParamOpts.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[functionName](...params);

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
