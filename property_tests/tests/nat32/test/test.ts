import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Nat32Arb } from '../../../arbitraries/candid/primitive/nats/nat32_arb';
import { getActor, runPropTests } from '../../..';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllNat32sQueryMethod = QueryMethodArb(fc.array(Nat32Arb), Nat32Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllNat32sQueryMethod));

function generateBody(
    namedParamNat32s: Named<CandidMeta<number>>[],
    returnNat32: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamNat32s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamNat32s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnNat32.src.valueLiteral);
    const count = namedParamNat32s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamNat32s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamNat32s: Named<CandidMeta<number>>[],
    returnNat32: CandidMeta<number>
): Test[] {
    const count = namedParamNat32s.length + 1;
    const expectedResult = Math.floor(
        namedParamNat32s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnNat32.agentResponseValue
        ) / count
    );
    const paramValues = namedParamNat32s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `nat32 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/nat32/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
