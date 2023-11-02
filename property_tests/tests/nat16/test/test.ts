import fc from 'fast-check';

import { Nat16Arb } from '../../../arbitraries/candid/primitive/nats/nat16_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const Nat16TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Nat16Arb),
        Nat16Arb
    )
    .map(([functionName, paramNat16s, defaultReturnNat16]): TestSample => {
        const imports = defaultReturnNat16.src.imports;

        const paramNames = paramNat16s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramNat16s
            .map((nat16) => nat16.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnNat16.src.candidType;

        const body = generateBody(paramNames, paramNat16s, defaultReturnNat16);

        const test = generateTest(
            functionName,
            paramNat16s,
            defaultReturnNat16
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

runPropTests(Nat16TestArb);

function generateBody(
    paramNames: string[],
    paramNat16s: Candid<number>[],
    returnNat16: Candid<number>
): string {
    const paramsAreNumbers = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnNat16.src.valueLiteral);
    const count = paramNat16s.length + 1;
    const average = `Math.floor((${sum}) / ${count})`;

    const paramLiterals = paramNat16s.map((sample) => sample.src.valueLiteral);
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
    paramNat16s: Candid<number>[],
    returnNat16: Candid<number>
): Test {
    const count = paramNat16s.length + 1;
    const expectedResult = Math.floor(
        paramNat16s.reduce(
            (acc, nat16) => acc + nat16.value,
            returnNat16.value
        ) / count
    );
    const paramValues = paramNat16s.map((sample) => sample.value);

    return {
        name: `nat16 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/nat16/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnNat16.equals(result, expectedResult)
            };
        }
    };
}
