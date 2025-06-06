import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamFloat64s: Named<CandidValueAndMeta<number>>[],
    returnFloat64: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamFloat64s.length + 1;
    const expectedResult =
        namedParamFloat64s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnFloat64.value.agentResponseValue
        ) / count;

    const paramValues = namedParamFloat64s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `float64 ${functionName}`,
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
