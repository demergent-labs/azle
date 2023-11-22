import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { NullArb } from '../../../arbitraries/candid/primitive/null';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNullsQueryMethod = QueryMethodArb(fc.array(NullArb), NullArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNullsQueryMethod));

function generateBody(
    namedParamNulls: Named<CandidMeta<null>>[],
    returnNull: CandidMeta<null>
): string {
    const areAllNull = namedParamNulls.reduce((acc, { name }) => {
        return `${acc} && ${name} === null`;
    }, 'true');

    const allNullCheck = `if (!(${areAllNull})) throw new Error("Not all of the values were null")`;

    return `
        ${allNullCheck}

        return ${returnNull.src.valueLiteral};
    `;
}

function generateTests(
    functionName: string,
    namedParamNulls: Named<CandidMeta<null>>[],
    _returnNull: CandidMeta<null>
): Test[] {
    return [
        {
            name: `test ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/null/test');

                const result = await actor[functionName](
                    ...namedParamNulls.map(
                        (param) => param.el.agentArgumentValue
                    )
                );

                return {
                    Ok: deepEqual(result, null)
                };
            }
        }
    ];
}
