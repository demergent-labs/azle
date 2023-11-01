import fc from 'fast-check';

import { Nat64Arb } from '../../../arbitraries/candid/primitive/nats/nat64_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

const Nat64TestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(Nat64Arb),
        Nat64Arb
    )
    .map(([functionName, paramNat64s, defaultReturnNat64]): TestSample => {
        const imports = defaultReturnNat64.src.imports;

        const paramNames = paramNat64s.map((_, index) => `param${index}`);
        const paramCandidTypes = paramNat64s
            .map((nat64) => nat64.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnNat64.src.candidType;

        const body = generateBody(paramNames, paramNat64s, defaultReturnNat64);

        const test = generateTest(
            functionName,
            paramNat64s,
            defaultReturnNat64
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

runPropTests(Nat64TestArb);

function generateBody(
    paramNames: string[],
    paramNat64s: Candid<bigint>[],
    returnNat64: Candid<bigint>
): string {
    const paramsAreBigInts = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
        })
        .join('\n');

    const sum = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnNat64.src.valueLiteral);
    const count = paramNat64s.length + 1;
    const average = `(${sum}) / ${count}n`;

    const paramLiterals = paramNat64s.map((sample) => sample.src.valueLiteral);
    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramLiterals[index]}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    return `
        ${paramsAreBigInts}

        ${paramsCorrectlyOrdered}

        return ${average};
    `;
}

function generateTest(
    functionName: string,
    paramNat64s: Candid<bigint>[],
    returnNat64: Candid<bigint>
): Test {
    const count = paramNat64s.length + 1;
    const expectedResult =
        paramNat64s.reduce(
            (acc, nat64) => acc + nat64.value,
            returnNat64.value
        ) / BigInt(count);
    const paramValues = paramNat64s.map((sample) => sample.value);

    return {
        name: `nat64 ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/nat64/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnNat64.equals(result, expectedResult)
            };
        }
    };
}
