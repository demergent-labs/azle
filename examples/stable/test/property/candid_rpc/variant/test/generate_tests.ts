import { getActor, Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { Variant } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/variant_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

export function generateTests(
    functionName: string,
    namedParamVariants: Named<CandidValueAndMeta<Variant>>[],
    returnVariant: CandidValueAndMeta<Variant>
): Test[][] {
    const expectedResult = returnVariant.value.agentResponseValue;

    return [
        [
            {
                name: `variant ${functionName}`,
                test: async (): Promise<AzleResult> => {
                    const actor = await getActor(__dirname);

                    const result = await actor[
                        functionName.startsWith('"')
                            ? functionName.slice(1, -1)
                            : functionName
                    ](
                        ...namedParamVariants.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return candidTestEquality(result, expectedResult);
                }
            }
        ]
    ];
}
