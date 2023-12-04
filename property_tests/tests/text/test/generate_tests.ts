import { deepEqual } from 'fast-equals';

import { getActor, Named } from 'azle/property_tests';
import { CandidMeta } from 'azle/property_tests/arbitraries/candid/candid_arb';
import { Test } from 'azle/test';

export function generateTests(
    functionName: string,
    namedParamTexts: Named<CandidMeta<string>>[],
    returnTexts: CandidMeta<string>
): Test[] {
    const expectedResult = namedParamTexts.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnTexts.agentResponseValue
    );
    const paramValues = namedParamTexts.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `text ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/text/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
