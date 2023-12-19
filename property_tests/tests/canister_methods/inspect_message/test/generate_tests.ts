import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import { CandidReturnType } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test } from 'azle/test';
import { InspectMessageBehavior } from './test';

export function generateTests(
    mode: 'query' | 'update',
    functionName: string,
    params: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CandidReturnType>,
    behavior: InspectMessageBehavior
): Test[][] {
    const paramValues = params.map(
        (param) => param.value.value.agentArgumentValue
    );

    const expectedResult = returnType.value.agentResponseValue;

    return [
        [
            {
                name: `${mode} method "${functionName}"`,
                test: async () => {
                    const actor = getActor(__dirname);
                    try {
                        const result = await actor[functionName](
                            ...paramValues
                        );

                        if (mode === 'update' && behavior !== 'ACCEPT') {
                            return {
                                Err: 'Expected canister method to throw but it did not'
                            };
                        }

                        return { Ok: deepEqual(result, expectedResult) };
                    } catch (error) {
                        if (mode === 'update' && behavior !== 'ACCEPT') {
                            return { Ok: true };
                        }

                        throw error;
                    }
                }
            }
        ]
    ];
}
