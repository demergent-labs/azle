import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int64Arb } from '../../../arbitraries/candid/primitive/ints/int64_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllInt64sQueryMethod = QueryMethodArb(fc.array(Int64Arb), Int64Arb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllInt64sQueryMethod));

function generateBody(
    namedParamInt64s: Named<CandidMeta<bigint>>[],
    returnInt64: CandidMeta<bigint>
): string {
    const paramsAreBigInts = namedParamInt64s
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamInt64s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt64.src.valueLiteral);
    const count = namedParamInt64s.length + 1;
    const average = `(${sum}) / ${count}n`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInt64s);

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamInt64s: Named<CandidMeta<bigint>>[],
    returnInt64: CandidMeta<bigint>
): Test[] {
    const count = namedParamInt64s.length + 1;
    const expectedResult =
        namedParamInt64s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnInt64.agentResponseValue
        ) / BigInt(count);

    const paramValues = namedParamInt64s.map(
        (param) => param.el.agentArgumentValue
    );
    return [
        {
            name: `int64 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int64/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
