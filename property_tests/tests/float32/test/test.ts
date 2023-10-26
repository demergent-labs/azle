import fc from 'fast-check';

import { areFloatsEqual } from '../../../are_equal/float';
import { Float32Arb } from '../../../arbitraries/candid/primitive/floats/float32_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const Float32TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(Float32Arb))
    .map(([functionName, float32s]): TestSample => {
        const paramCandidTypes = float32s
            .map((float32) => float32.meta.candidType)
            .join(', ');
        const returnCandidType = 'float32';
        const paramNames = float32s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const returnStatement = float32s.length === 0 ? '0' : `param0`;

        const paramValues = float32s.map((float32s) => float32s.value);
        const expectedResult = float32s.length === 0 ? 0 : float32s[0].value;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                const areFloat32sEqual = areFloatsEqual(
                    paramName,
                    paramValues[index]
                );
                return `if (!(${areFloat32sEqual})) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['float32'],
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
                    const actor = getActor('./tests/float32/test');

                    const result = await actor[functionName](...paramValues);

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
