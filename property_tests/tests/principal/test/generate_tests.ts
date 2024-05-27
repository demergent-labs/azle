import { Principal } from '@dfinity/principal';
import { getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Test, testEquality } from 'azle/test';

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
                test: async () => {
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
