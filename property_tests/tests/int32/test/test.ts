import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int32Arb } from '../../../arbitraries/candid/primitive/ints/int32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const Int32TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Int32Arb),
        Int32Arb
    )
    .map(
        ([
            functionName,
            paramInt32s,
            defaultReturnInt32
        ]): QueryMethodBlueprint => {
            const imports = defaultReturnInt32.src.imports;

            const paramNames = paramInt32s.map((_, index) => `param${index}`);
            const paramCandidTypes = paramInt32s
                .map((int32) => int32.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnInt32.src.candidType;

            const body = generateBody(
                paramNames,
                paramInt32s,
                defaultReturnInt32
            );

            const tests = [
                generateTest(functionName, paramInt32s, defaultReturnInt32)
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

runPropTests(CanisterArb(Int32TestArb));

function generateBody(
    paramNames: string[],
    paramInt32s: CandidMeta<number>[],
    returnInt32: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnInt32.src.valueLiteral);
    const count = paramInt32s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramInt32s
    );

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramInt32s: CandidMeta<number>[],
    returnInt32: CandidMeta<number>
): Test {
    const count = paramInt32s.length + 1;
    const expectedResult = Math.floor(
        paramInt32s.reduce(
            (acc, int32) => acc + int32.value,
            returnInt32.value
        ) / count
    );
    const paramValues = paramInt32s.map((sample) => sample.value);

    return {
        name: `int32 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int32/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
