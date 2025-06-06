import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamBools: Named<CandidValueAndMeta<boolean>>[],
    returnBool: CandidValueAndMeta<boolean>
): Test[][] {
    const expectedResult = namedParamBools.reduce(
        (acc, param) => acc && param.value.value.agentResponseValue,
        returnBool.value.agentResponseValue
    );
    const paramValues = namedParamBools.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `bool ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](...paramValues);

                    return candidTestEquality(result, expectedResult);
                }
            }
        ]
    ];
}
