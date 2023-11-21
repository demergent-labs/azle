import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Nat16Arb } from '../../../arbitraries/candid/primitive/nats/nat16_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNat16sQueryMethod = QueryMethodArb(fc.array(Nat16Arb), Nat16Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat16sQueryMethod));

function generateBody(
    namedParamNat16s: Named<CandidMeta<number>>[],
    returnNat16: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamNat16s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamNat16s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat16.src.valueLiteral);
    const count = namedParamNat16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat16s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamNat16s: Named<CandidMeta<number>>[],
    returnNat16: CandidMeta<number>
): Test[] {
    const count = namedParamNat16s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat16s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat16.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat16s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat16 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat16/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
