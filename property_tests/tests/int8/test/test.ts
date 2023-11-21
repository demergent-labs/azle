import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int8Arb } from '../../../arbitraries/candid/primitive/ints/int8_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllInt8sQueryMethod = QueryMethodArb(fc.array(Int8Arb), Int8Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt8sQueryMethod));

function generateBody(
    namedParamInt8s: Named<CandidMeta<number>>[],
    returnInt8: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamInt8s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const sum = namedParamInt8s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt8.src.valueLiteral);
    const count = namedParamInt8s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt8s);

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamInt8s: Named<CandidMeta<number>>[],
    returnInt8: CandidMeta<number>
): Test[] {
    const count = namedParamInt8s.length + 1;
    const expectedResult = Math.floor(
        namedParamInt8s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt8.agentResponseValue
        ) / count
    );
    const paramValues = namedParamInt8s.map(
        (param) => param.el.agentArgumentValue
    );
    return [
        {
            name: `test ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int8/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
