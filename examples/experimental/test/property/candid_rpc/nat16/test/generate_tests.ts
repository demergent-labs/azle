import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

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
