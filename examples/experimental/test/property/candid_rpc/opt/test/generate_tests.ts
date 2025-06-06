import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Opt } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/opt_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);

                    const params = namedParamOpts.map(
                        (param) => param.value.value.agentArgumentValue
                    );

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](...params);

                    return candidTestEquality(result, expectedResult);
                }
            }
        ]
    ];
}
