import { Principal } from '@dfinity/principal';
import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

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
                    const actor = await getActor(__dirname);
                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](
                        ...namedParamPrincipals.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return candidTestEquality(result, expectedResult);
                }
            }
        ]
    ];
}
