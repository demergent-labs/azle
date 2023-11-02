import fc from 'fast-check';

import { Nat32Arb } from '../../../arbitraries/candid/primitive/nats/nat32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../..';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const Nat32TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Nat32Arb),
        Nat32Arb
    )
    .map(([functionName, paramNat32s, defaultReturnNat32]): TestSample => {
        const imports = defaultReturnNat32.src.imports;

        const paramNames = paramNat32s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramNat32s
            .map((nat32) => nat32.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnNat32.src.candidType;

        const body = generateBody(paramNames, paramNat32s, defaultReturnNat32);

        const test = generateTest(
            functionName,
            paramNat32s,
            defaultReturnNat32
        );

        return {
            imports,
            functionName,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(Nat32TestArb);

function generateBody(
    paramNames: string[],
    paramNat32s: CandidMeta<number>[],
    returnNat32: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnNat32.src.valueLiteral);
    const count = paramNat32s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramLiterals = paramNat32s.map((sample) => sample.src.valueLiteral);

    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramLiterals[index]}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    return `
        ${paramsAreNumbers}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramNat32s: CandidMeta<number>[],
    returnNat32: CandidMeta<number>
): Test {
    const count = paramNat32s.length + 1;
    const expectedResult = Math.floor(
        paramNat32s.reduce(
            (acc, nat32) => acc + nat32.value,
            returnNat32.value
        ) / count
    );
    const paramValues = paramNat32s.map((sample) => sample.value);

    return {
        name: `nat32 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/nat32/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnNat32.equals(result, expectedResult)
            };
        }
    };
}
