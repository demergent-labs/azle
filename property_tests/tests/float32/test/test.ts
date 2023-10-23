import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { Float32Arb } from '../../../arbitraries/candid/primitive/floats/float32_arb';
import { areFloatsEqual } from '../../../are_equal';

const Float32TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Float32Arb))
    .map(([functionName, float32s]) => {
        const paramCandidTypes = float32s.map(() => 'float32').join(', ');
        const returnCandidType = 'float32';
        const paramNames = float32s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const returnStatement = float32s.length === 0 ? '0' : `param0`;

        const paramSamples = float32s;
        const expectedResult = float32s.length === 0 ? 0 : float32s[0];

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                const areFloat32sEqual = areFloatsEqual(
                    paramName,
                    paramSamples[index]
                );
                return `if (!${areFloat32sEqual}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['float32'],
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
                    const actor = getActor('./tests/float32/test');

                    const result = await actor[functionName](...float32s);

                    if (Number.isNaN(expectedResult)) {
                        return {
                            Ok: Number.isNaN(result)
                        };
                    }

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Float32TestArb);
