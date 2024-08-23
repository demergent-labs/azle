import { getActor, Named } from 'azle/test/property';
import { CandidReturnType } from 'azle/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/test/property/arbitraries/candid/corresponding_js_type';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    params: Named<CandidValueAndMeta<CorrespondingJSType>>[],
    returnType: CandidValueAndMeta<CandidReturnType>
): Test[][] {
    const paramValues = params.map(
        (param) => param.value.value.agentArgumentValue
    );
    const expectedResult = returnType.value.agentResponseValue;

    return [
        [
            {
                name: `query method "${functionName}"`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);
                    const result = await actor[functionName](...paramValues);
                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
