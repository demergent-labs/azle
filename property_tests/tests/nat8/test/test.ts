import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { Nat8Arb } from '../../../arbitraries/candid/primitive/nats/nat8_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const Nat8TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Nat8Arb),
        Nat8Arb
    )
    .map(([functionName, paramNat8s, defaultReturnNat8]): TestSample => {
        const imports = defaultReturnNat8.src.imports;

        const paramNames = paramNat8s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramNat8s
            .map((nat8) => nat8.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnNat8.src.candidType;

        const body = generateBody(paramNames, paramNat8s, defaultReturnNat8);

        const test = generateTest(functionName, paramNat8s, defaultReturnNat8);

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

runPropTests(Nat8TestArb);

function generateBody(
    paramNames: string[],
    paramNat8s: CandidMeta<number>[],
    returnNat8: CandidMeta<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnNat8.src.valueLiteral);
    const count = paramNat8s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramLiteral = paramNat8s.map((sample) => sample.src.valueLiteral);
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramLiteral[index]}) throw new Error('${paramName} is incorrectly ordered')`;
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
    paramNat8s: CandidMeta<number>[],
    returnNat8: CandidMeta<number>
): Test {
    const count = paramNat8s.length + 1;
    const expectedResult = Math.floor(
        paramNat8s.reduce((acc, nat8) => acc + nat8.value, returnNat8.value) /
            count
    );
    const paramValues = paramNat8s.map((sample) => sample.value);

    return {
        name: `nat8 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/nat8/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
