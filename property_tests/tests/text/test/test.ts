import fc from 'fast-check';

import { TextArb } from '../../../arbitraries/candid/primitive/text';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const TextTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(TextArb))
    .map(([functionName, texts]): TestSample => {
        const paramCandidTypes = texts
            .map((text) => text.meta.candidType)
            .join(', ');
        const returnCandidType = 'text';
        const paramNames = texts.map((_, index) => `param${index}`);

        const paramsAreStrings = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'string') throw new Error('${paramName} must be a string');`;
            })
            .join('\n');

        const returnStatement = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '""');

        const expectedResult = texts.reduce(
            (acc, text) => acc + text.value,
            ''
        );
        const paramValues = texts.map((text) => text.value);

        function escapeStringForJavaScript(input: string) {
            return input
                .replace(/\\/g, '\\\\') // Escape backslashes
                .replace(/'/g, "\\'") // Escape single quotes
                .replace(/"/g, '\\"'); // Escape double quotes
        }

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== '${escapeStringForJavaScript(
                    paramValues[index]
                )}') throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['text'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreStrings}

            return ${returnStatement};
        `,
            test: {
                name: `text ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/text/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(TextTestArb);
