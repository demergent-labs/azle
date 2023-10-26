import fc from 'fast-check';

import { IntArb } from '../../../arbitraries/candid/primitive/ints/int_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const IntTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(IntArb))
    .map(([functionName, ints]): TestSample => {
        const paramCandidTypes = ints
            .map((int) => int.meta.candidType)
            .join(', ');
        const returnCandidType = 'int';
        const paramNames = ints.map((_, index) => `param${index}`);

        const paramsAreBigInts = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0n');

        const returnStatement = `${paramsSum}`;

        const expectedResult = ints.reduce((acc, int) => acc + int.value, 0n);

        const paramValues = ints.map((sample) => sample.value);

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramValues[index]}n) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['int'],
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
                    const actor = getActor('./tests/int/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(IntTestArb);
