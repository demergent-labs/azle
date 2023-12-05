import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamVecs: Named<CandidValueAndMeta<any>>[],
    returnVec: CandidValueAndMeta<any>
): Test[] {
    const expectedResult = returnVec.agentResponseValue;

    return [
        {
            name: `vec ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/vec/test');

                const params = namedParamVecs.map(
                    (param) => param.el.agentArgumentValue
                );
                const result = await actor[functionName](...params);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
