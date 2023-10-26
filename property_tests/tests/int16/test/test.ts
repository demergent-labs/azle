import fc from 'fast-check';

import { Int16Arb } from '../../../arbitraries/candid/primitive/ints/int16_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const Int16TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Int16Arb))
    .map(([functionName, int16s]): TestSample => {
        const paramCandidTypes = int16s
            .map((int16) => int16.meta.candidType)
            .join(', ');
        const returnCandidType = 'int16';
        const paramNames = int16s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = int16s.length === 0 ? 1 : int16s.length;

        const returnStatement = `Math.floor((${paramsSum}) / ${length})`;

        const expectedResult = Math.floor(
            int16s.reduce((acc, int16) => acc + int16.value, 0) / length
        );

        const paramValues = int16s.map((sample) => sample.value);

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramValues[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['int16'],
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
                    const actor = getActor('./tests/int16/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Int16TestArb);
