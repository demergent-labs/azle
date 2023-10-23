import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { Float64ArrayArb } from '../../../arbitraries/candid/primitive/floats/float64_arb';
import { areFloatsEqual } from '../../../are_equal';

const Float64TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), Float64ArrayArb)
    .map(([functionName, float64Array]) => {
        const float64s = [...float64Array.values()];
        const paramCandidTypes = float64s.map(() => 'float64').join(', ');
        const returnCandidType = 'float64';
        const paramNames = float64s.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'number') throw new Error('${paramName} must be a number');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0');

        const length = float64s.length === 0 ? 1 : float64s.length;

        const returnStatement = `(${paramsSum}) / ${length}`;

        const expectedResult =
            float64s.reduce((acc, float64) => acc + float64, 0) / length;
        const paramSamples = float64s;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                let areFloat64sEqual = areFloatsEqual(
                    paramName,
                    paramSamples[index]
                );
                return `if (!${areFloat64sEqual}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['float64'],
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
                    const actor = getActor('./tests/float64/test');

                    const result = await actor[functionName](...float64s);

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

runPropTests(Float64TestArb);
