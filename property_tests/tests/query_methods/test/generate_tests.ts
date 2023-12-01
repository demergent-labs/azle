import { deepEqual } from 'fast-equals';

import { getActor } from 'azle/property_tests';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { TestsGenerator } from 'azle/property_tests/arbitraries/query_method_arb';
import { Test } from 'azle/test';

export const generateTests: TestsGenerator<
    CorrespondingJSType,
    CorrespondingJSType
> = (functionName, params, returnType): Test[] => {
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
};
