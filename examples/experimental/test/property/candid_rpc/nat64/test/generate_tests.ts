import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamNat64s: Named<CandidValueAndMeta<bigint>>[],
    returnNat64: CandidValueAndMeta<bigint>
): Test[][] {
    const count = namedParamNat64s.length + 1;
    const expectedResult =
        namedParamNat64s.reduce(
            (acc, param) => acc + param.value.value.agentResponseValue,
            returnNat64.value.agentResponseValue
        ) / BigInt(count);
    const paramValues = namedParamNat64s.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `nat64 ${functionName}`,
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
