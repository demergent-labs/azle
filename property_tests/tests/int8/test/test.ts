import fc from 'fast-check';
import { Int8Arb } from '../../../arbitraries/candid/primitive/ints/int8_arb';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const Int8TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Int8Arb))
    .map(([functionName, int8s]) => {
        const paramCandidTypes = int8s
            .map((int8) => int8.candidType)
            .join(', ');
        const returnCandidType = 'int8';
        const paramNames = int8s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = int8s.length === 0 ? 1 : int8s.length;

        const returnStatement = `Math.floor((${paramsSum}) / ${length})`;

        const expectedResult = Math.floor(
            int8s.reduce((acc, int8) => acc + int8.value, 0) / length
        );

        const paramSamples = int8s;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['int8'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreNumbers}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/int8/test');

                    const result = await actor[functionName](...int8s);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Int8TestArb);
