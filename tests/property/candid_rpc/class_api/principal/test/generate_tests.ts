import { Principal } from '@dfinity/principal';
import { getActor, Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { AzleResult, Test, testEquality } from 'azle/test/property/test';

export function generateTests(
    functionName: string,
    namedParamPrincipals: Named<CandidValueAndMeta<Principal>>[],
    returnPrincipal: CandidValueAndMeta<Principal>
): Test[][] {
    const expectedResult =
        namedParamPrincipals.length > 0
            ? namedParamPrincipals[0].value.value.agentResponseValue
            : returnPrincipal.value.agentResponseValue;

    return [
        [
            {
                name: `principal ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = getActor(__dirname);
                    const result = await actor[functionName](
                        ...namedParamPrincipals.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
