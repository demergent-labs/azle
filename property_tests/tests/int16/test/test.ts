import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int16Arb } from '../../../arbitraries/candid/primitive/ints/int16_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllInt16sQueryMethod = QueryMethodArb(fc.array(Int16Arb), Int16Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt16sQueryMethod));

function generateBody(
    namedParamInt16s: Named<CandidMeta<number>>[],
    returnInt16: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamInt16s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt16s);

    const sum = namedParamInt16s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt16.src.valueLiteral);
    const count = namedParamInt16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamInt16s: Named<CandidMeta<number>>[],
    returnInt16: CandidMeta<number>
): Test[] {
    const count = namedParamInt16s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt16s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt16.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt16s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `int16 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int16/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
