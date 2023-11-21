import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Float64Arb } from '../../../arbitraries/candid/primitive/floats/float64_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { Named, QueryMethodArb } from '../../../arbitraries/query_method_arb';

const AllFloat64sQueryMethod = QueryMethodArb(
    fc.array(Float64Arb),
    Float64Arb,
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(AllFloat64sQueryMethod));

function generateBody(
    namedParamFloat64s: Named<CandidMeta<number>>[],
    returnFloat64: CandidMeta<number>
): string {
    const paramsAreNumbers = namedParamFloat64s
        .map((param) => {
            return `if (typeof ${param.name} !== 'number') throw new Error('${param.name} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered =
        areParamsCorrectlyOrdered(namedParamFloat64s);

    const sum = namedParamFloat64s.reduce((acc, { name }) => {
        return `${acc} + ${name}`;
    }, returnFloat64.src.valueLiteral);
    const count = namedParamFloat64s.length + 1;
    const average = `(${sum}) / ${count}`;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${average};
    `;
}

function generateTests(
    functionName: string,
    namedParamFloat64s: Named<CandidMeta<number>>[],
    returnFloat64: CandidMeta<number>
): Test[] {
    const count = namedParamFloat64s.length + 1;
    const expectedResult =
        namedParamFloat64s.reduce(
            (acc, param) => acc + param.el.agentResponseValue,
            returnFloat64.agentResponseValue
        ) / count;

    const paramValues = namedParamFloat64s.map(
        (param) => param.el.agentArgumentValue
    );

    return [
        {
            name: `float64 ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/float64/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
