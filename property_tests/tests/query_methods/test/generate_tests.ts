import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { CandidReturnType } from '../../../arbitraries/candid/candid_return_type_arb';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    params: Named<CandidMeta<CandidType>>[],
    returnType: CandidMeta<CandidReturnType>
): Test[] {
    const paramValues = params.map((param) => param.el.agentArgumentValue);
    const expectedResult = returnType.agentResponseValue;

    return [
        {
            name: `query method "${functionName}"`,
            test: async () => {
                const actor = getActor('./tests/query_methods/test');
                const result = await actor[functionName](...paramValues);
                const valuesAreEqual = deepEqual(result, expectedResult);

                return valuesAreEqual
                    ? { Ok: true }
                    : {
                          Err: `\n Incorrect return value\n   expected: ${expectedResult}\n   received: ${result}`
                      };
            }
        }
    ];
}
