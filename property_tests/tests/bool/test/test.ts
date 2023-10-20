import fc from 'fast-check';
import { getCanisterId } from '../../../../test';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const BoolTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(fc.boolean()))
    .map(([functionName, bools]) => {
        const paramCandidTypes = bools.map(() => 'bool').join(', ');
        const returnCandidType = 'bool';
        const paramNames = bools.map((_, index) => `param${index}`);

        const paramsAreNumbers = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'boolean') throw new Error('${paramName} must be a boolean');`;
            })
            .join('\n');

        const paramsAnd = paramNames.reduce((acc, paramName) => {
            return `${acc} && ${paramName}`;
        }, 'true');

        const returnStatement = `${paramsAnd}`;

        const expectedResult = bools.reduce((acc, bool) => acc && bool, true);

        const paramSamples = bools;

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramSamples[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['bool'],
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

                    const result = await actor[functionName](...bools);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(BoolTestArb);
