import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { TextArb } from '../../../arbitraries/candid/primitive/text';

const TextTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(TextArb))
    .map(([functionName, texts]) => {
        const paramCandidTypes = texts.map(() => 'text').join(', ');
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

        const expectedResult = texts.reduce((acc, text) => acc + text, '');
        const paramSamples = texts;

        function escapeStringForJavaScript(input: string) {
            return input
                .replace(/\\/g, '\\\\') // Escape backslashes
                .replace(/'/g, "\\'") // Escape single quotes
                .replace(/"/g, '\\"'); // Escape double quotes
        }

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== '${escapeStringForJavaScript(
                    paramSamples[index]
                )}') throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['text'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreStrings}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/text/test');

                    const result = await actor[functionName](...texts);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(TextTestArb);
