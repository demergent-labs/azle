import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import {
    ReturnTuple,
    Tuple
} from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import { AzleResult, Test, testEquality } from 'azle/property_tests/test';

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
                    const actor = getActor(__dirname);

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
