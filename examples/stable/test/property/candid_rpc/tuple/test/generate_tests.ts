import { getActor, Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    ReturnTuple,
    Tuple
} from 'azle/_internal/test/property/arbitraries/candid/constructed/tuple_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamTuples: Named<CandidValueAndMeta<Tuple, ReturnTuple>>[],
    returnTuple: CandidValueAndMeta<Tuple, ReturnTuple>
): Test[][] {
    const expectedResult = returnTuple.value.agentResponseValue;

    return [
        [
            {
                name: `tuple ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamTuples.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
