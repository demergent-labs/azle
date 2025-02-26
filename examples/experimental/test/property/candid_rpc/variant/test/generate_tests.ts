import { getActor, Named } from 'azle/_internal/test/property';
import { CandidValueAndMeta } from 'azle/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import {
    AzleResult,
    Test,
    testEquality
} from 'azle/_internal/test/property/test';
import { Variant } from 'azle/_internal/test/property/variant_arb';

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

                    const result = await actor[functionName](
                        ...namedParamVariants.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return testEquality(result, expectedResult);
                }
            }
        ]
    ];
}
