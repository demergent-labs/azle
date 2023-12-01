import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Opt } from 'azle/property_tests/arbitraries/candid/constructed/opt_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamOpts: Named<CandidMeta<Opt>>[],
    returnOpt: CandidMeta<Opt>
): Test[] {
    const expectedResult = returnOpt.agentResponseValue;

    return [
        {
            name: `opt ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/opt/test');

                const params = namedParamOpts.map(
                    (param) => param.el.agentArgumentValue
                );

                const result = await actor[functionName](...params);

                return {
                    Ok: deepEqual(expectedResult, result)
                };
            }
        }
    ];
}
