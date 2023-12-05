import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CandidType } from 'azle/property_tests/arbitraries/candid/candid_type_arb';
import { TestsGenerator } from 'azle/property_tests/arbitraries/canister_methods';
import { Test } from 'azle/test';
import { CandidReturnType } from '../../../arbitraries/candid/candid_return_type_arb';

export const generateTests: TestsGenerator<
    CandidType,
    CandidReturnType,
    CandidType,
    CandidReturnType
> = (functionName, params, returnType): Test[] => {
    const paramValues = params.map((param) => param.el.agentArgumentValue);
    const expectedResult = returnType.agentResponseValue;

    return [
        {
            name: `update method "${functionName}"`,
            test: async () => {
                const actor = getActor('./tests/update_methods/test');
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
