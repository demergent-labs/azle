import { deepEqual, getActor, Named } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { Variant } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import { Test } from 'azle/test';

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
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor[functionName](
                        ...namedParamVariants.map(
                            (param) => param.value.value.agentArgumentValue
                        )
                    );

                    return {
                        Ok: deepEqual(result, expectedResult)
                    };
                }
            }
        ]
    ];
}
