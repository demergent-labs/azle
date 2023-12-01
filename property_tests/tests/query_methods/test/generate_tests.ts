import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CorrespondingJSType } from '../../../arbitraries/candid/corresponding_js_type';
import { CandidReturnType } from '../../../arbitraries/candid/return_type_arb';
import { CandidValueAndMeta } from '../../../arbitraries/candid/value_and_meta_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    params: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CandidReturnType>
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
