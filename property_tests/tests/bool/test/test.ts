import fc from 'fast-check';

import { BoolArb } from '../../../arbitraries/candid/primitive/bool';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const BoolTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(BoolArb),
        BoolArb
    )
    .map(([functionName, bools, returnBool]): TestSample => {
        const paramCandidTypes = bools
            .map((bool) => bool.meta.candidType)
            .join(', ');
        const returnCandidType = returnBool.meta.candidType;
        const paramNames = bools.map((_, index) => `param${index}`);

        // TODO do we want to encapsulate 'boolean' in the CandidArb? Like an agentType instead of a candidType, like azleValue and agentValue?
        // TODO or will this not matter anymore once we start using a deep equal library
        const paramsAreBooleans = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'boolean') throw new Error('${paramName} must be a boolean');`;
            })
            .join('\n');

        const returnStatement = paramNames.reduce((acc, paramName) => {
            return `${acc} && ${paramName}`;
        }, `${returnBool.value}`);

        const expectedResult = bools.reduce(
            (acc, bool) => acc && bool.value,
            returnBool.value
        );

        const paramValues = bools.map((bool) => bool.value);

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                return `if (${paramName} !== ${paramValues[index]}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['bool'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body: `
            ${paramsCorrectlyOrdered}

            ${paramsAreBooleans}

            return ${returnStatement};
        `,
            test: {
                name: `bool ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/bool/test');

                    const result = await actor[functionName](...paramValues);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

runPropTests(BoolTestArb);
