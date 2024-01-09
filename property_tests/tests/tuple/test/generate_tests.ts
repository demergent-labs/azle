import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import {
    Tuple,
    ReturnTuple
} from 'azle/property_tests/arbitraries/candid/constructed/tuple_arb';
import { Test } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamTuples.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return { Ok: deepEqual(result, expectedResult) };
                }
            }
        ]
    ];
}
