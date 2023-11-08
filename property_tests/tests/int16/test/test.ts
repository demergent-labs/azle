import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { Int16Arb } from '../../../arbitraries/candid/primitive/ints/int16_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const Int16TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Int16Arb),
        Int16Arb
    )
    .map(
        ([
            functionName,
            paramInt16s,
            defaultReturnInt16
        ]): QueryMethodBlueprint => {
            const imports = defaultReturnInt16.src.imports;

            const paramNames = paramInt16s.map((_, index) => `param${index}`);
            const paramCandidTypes = paramInt16s
                .map((int16) => int16.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnInt16.src.candidType;

            const body = generateBody(
                paramNames,
                paramInt16s,
                defaultReturnInt16
            );

            const tests = [
                generateTest(functionName, paramInt16s, defaultReturnInt16)
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

runPropTests(CanisterArb(Int16TestArb));

function generateBody(
    paramNames: string[],
    paramInt16s: CandidMeta<number>[],
    returnInt16: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramInt16s
    );

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnInt16.src.valueLiteral);
    const count = paramInt16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramInt16s: CandidMeta<number>[],
    returnInt16: CandidMeta<number>
): Test {
    const count = paramInt16s.length + 1;
    const expectedResult = Math.floor(
        paramInt16s.reduce(
            (acc, int16) => acc + int16.value,
            returnInt16.value
        ) / count
    );
    const paramValues = paramInt16s.map((sample) => sample.value);

    return {
        name: `int16 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/int16/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
