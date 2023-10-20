import fc from 'fast-check';
import { getCanisterId } from '../../../../test';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const Nat8TestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(fc.string()))
    .map(([functionName, texts]) => {
        const paramCandidTypes = texts.map(() => 'text').join(', ');
        const returnCandidType = 'text';
        const paramNames = texts.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'string') throw new Error('${paramName} must be a string');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '""');

        const returnStatement = `${paramsSum}`;

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

            ${paramsAreNumbers}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const { createActor } = await import(
                        `./dfx_generated/canister`
                    );

                    const actor: any = createActor(getCanisterId('canister'), {
                        agentOptions: {
                            host: 'http://127.0.0.1:8000'
                        }
                    });

                    const result = await actor[functionName](...texts);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(Nat8TestArb);
