import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { TestsGenerator } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export const generateTests: TestsGenerator<CandidType, CandidType> = (
    functionName,
    params,
    returnType
): Test[] => {
    const paramValues = params.map((param) => param.el.value);
    const expectedResult = returnType.value;

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
};
