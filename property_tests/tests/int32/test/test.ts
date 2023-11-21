import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int32Arb } from '../../../arbitraries/candid/primitive/ints/int32_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllInt32sQueryMethod = QueryMethodArb(fc.array(Int32Arb), Int32Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt32sQueryMethod));

function generateBody(
    namedParamInt32s: Named<CandidMeta<number>>[],
    returnInt32: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamInt32s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamInt32s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt32.src.valueLiteral);
    const count = namedParamInt32s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt32s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamInt32s: Named<CandidMeta<number>>[],
    returnInt32: CandidMeta<number>
): Test[] {
    const count = namedParamInt32s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt32s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt32.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt32s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `int32 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int32/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
