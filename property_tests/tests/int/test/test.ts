import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { IntArb } from '../../../arbitraries/candid/primitive/ints/int_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllIntsQueryMethod = QueryMethodArb(fc.array(IntArb), IntArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllIntsQueryMethod));

function generateBody(
    namedParamInts: Named<CandidMeta<bigint>>[],
    returnInt: CandidMeta<bigint>
): string {
    const paramsAreBigInts = namedParamInts
        .map((param) => {
            return `if (typeof ${param.name} !== 'bigint') throw new Error('${param.name} must be a bigint');`;
        })
        .join('\n');

    const sum = namedParamInts.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnInt.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamInts);

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${sum};
    `;
}

function generateTests(
    functionName: string,
    namedParamInts: Named<CandidMeta<bigint>>[],
    returnInt: CandidMeta<bigint>
): Test[] {
    const expectedResult = namedParamInts.reduce(
        (acc, param) => acc + param.el.agentResponseValue,
        returnInt.agentResponseValue
    );
    const paramValues = namedParamInts.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `int ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/int/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
