import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { BoolArb } from '../../../arbitraries/candid/primitive/bool';

const BoolTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(BoolArb))
    .map(([functionName, bools]) => {
        const paramCandidTypes = bools.map(() => 'bool').join(', ');
        // TODO what if we just had at least one param? that way we would always have a return value?
        const returnCandidType = 'bool';
        const paramNames = bools.map((_, index) => `param${index}`);

        // TODO do we want to encapsulate 'boolean' in the CandidArb? Like an agentType instead of a candidType, like azleValue and agentValue?
        const paramsAreBooleans = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'boolean') throw new Error('${paramName} must be a boolean');`;
            })
            .join('\n');

        const returnStatement = paramNames.reduce((acc, paramName) => {
            return `${acc} && ${paramName}`;
        }, 'true');

        const expectedResult = bools.reduce(
            (acc, bool) => acc && bool.value,
            true
        );

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

            ${paramsAreBooleans}

            return ${returnStatement};
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/bool/test');

                    const result = await actor[functionName](...bools);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(BoolTestArb);
