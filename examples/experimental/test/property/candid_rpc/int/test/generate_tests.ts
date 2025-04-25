import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamInts: Named<CandidValueAndMeta<bigint>>[],
    returnInt: CandidValueAndMeta<bigint>
): Test[][] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.value.value.agentResponseValue,
        returnInt.value.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.value.value.agentArgumentValue
    );

    return [
        [
            {
                name: `int ${functionName}`,
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
