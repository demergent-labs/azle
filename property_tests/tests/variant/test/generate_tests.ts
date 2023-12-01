import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Variant } from 'azle/property_tests/arbitraries/candid/constructed/variant_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamVariants: Named<CandidMeta<Variant>>[],
    returnVariant: CandidMeta<Variant>
): Test[] {
    const expectedResult = returnVariant.agentResponseValue;

    return [
        {
            name: `variant ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/variant/test');

                const result = await actor[functionName](
                    ...namedParamVariants.map(
                        (param) => param.el.agentArgumentValue
                    )
                );

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
