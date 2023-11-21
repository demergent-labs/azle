import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Nat8Arb } from '../../../arbitraries/candid/primitive/nats/nat8_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNat8sQueryMethod = QueryMethodArb(fc.array(Nat8Arb), Nat8Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat8sQueryMethod));

function generateBody(
    namedParamNat8s: Named<CandidMeta<number>>[],
    returnNat8: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamNat8s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamNat8s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat8.src.valueLiteral);
    const count = namedParamNat8s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat8s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamNat8s: Named<CandidMeta<number>>[],
    returnNat8: CandidMeta<number>
): Test[] {
    const count = namedParamNat8s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat8s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat8.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat8s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat8 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat8/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
