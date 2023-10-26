import fc from 'fast-check';

import { Int64Arb } from '../../../arbitraries/candid/primitive/ints/int64_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const Int64TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Int64Arb))
    .map(([functionName, int64s]): TestSample => {
        const paramCandidTypes = int64s
            .map((int64) => int64.meta.candidType)
            .join(', ');
        const returnCandidType = 'int64';
        const paramNames = int64s.map((_, index) => `param${index}`);

        const paramsAreBigInts = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0n');

        const length = int64s.length === 0 ? 1 : int64s.length;

        const returnStatement = `(${paramsSum}) / ${length}n`;

        const expectedResult =
            int64s.reduce((acc, int64) => acc + int64.value, 0n) /
            BigInt(length);

        const paramValues = int64s.map((sample) => sample.value);

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramValues[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['int64'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreBigInts}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/int64/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Int64TestArb);
