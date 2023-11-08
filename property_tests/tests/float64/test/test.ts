import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Float64Arb } from '../../../arbitraries/candid/primitive/floats/float64_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const Float64TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Float64Arb),
        Float64Arb
    )
    .map(
        ([
            functionName,
            paramFloat64s,
            defaultReturnFloat64
        ]): QueryMethodBlueprint => {
            const imports = defaultReturnFloat64.src.imports;

            const paramNames = paramFloat64s.map((_, index) => `param${index}`);
            const paramCandidTypes = paramFloat64s
                .map((float64) => float64.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnFloat64.src.candidType;

            const body = generateBody(
                paramNames,
                paramFloat64s,
                defaultReturnFloat64
            );

            const tests = [
                generateTest(functionName, paramFloat64s, defaultReturnFloat64)
            ];

            return {
                imports,
                functionName,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                tests
            };
        }
    );

runPropTests(CanisterArb(Float64TestArb));

function generateBody(
    paramNames: string[],
    paramFloat64s: CandidMeta<number>[],
    returnFloat64: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramFloat64s
    );

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnFloat64.src.valueLiteral);
    const count = paramFloat64s.length + 1;
    const average = `(${sum}) / ${count}`;

    return `
        ${paramsCorrectlyOrdered}

        ${paramsAreNumbers}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramFloat64s: CandidMeta<number>[],
    returnFloat64: CandidMeta<number>
): Test {
    const count = paramFloat64s.length + 1;
    const expectedResult =
        paramFloat64s.reduce(
            (acc, float64) => acc + float64.agentResponseValue,
            returnFloat64.agentResponseValue
        ) / count;

    const paramValues = paramFloat64s.map(
        (float64) => float64.agentArgumentValue
    );

    return {
        name: `float64 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/float64/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
