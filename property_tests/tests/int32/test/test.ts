import fc from 'fast-check';

import { Int32Arb } from '../../../arbitraries/candid/primitive/ints/int32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const Int32TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Int32Arb))
    .map(([functionName, int32s]): TestSample => {
        const paramCandidTypes = int32s
            .map((int32) => int32.meta.candidType)
            .join(', ');
        const returnCandidType = 'int32';
        const paramNames = int32s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = int32s.length === 0 ? 1 : int32s.length;

        const returnStatement = `Math.floor((${paramsSum}) / ${length})`;

        const expectedResult = Math.floor(
            int32s.reduce((acc, int32) => acc + int32.value, 0) / length
        );

        const paramValues = int32s.map((sample) => sample.value);

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramValues[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['int32'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreNumbers}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/int32/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Int32TestArb);
