import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNat32s: Named<CandidValueAndMeta<number>>[],
    returnNat32: CandidValueAndMeta<number>
): Test[][] {
    const count = namedParamNat32s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat32s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat32.value.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat32s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat32 ${functionName}`,
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
