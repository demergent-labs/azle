import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';

const NullTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.nat({ max: 20 }))
    .map(([functionName, nullCount]) => {
        const nulls = Array.from({ length: nullCount }, () => null);
        const paramCandidTypes = nulls.map(() => 'Null').join(', ');
        const returnCandidType = 'Null';
        const paramNames = nulls.map((_, index) => `param${index}`);

        const areAllNull = paramNames.reduce((acc, paramName) => {
            return `${acc} && ${paramName} === null`;
        }, 'true');

        const allNullCheck = `if (!(${areAllNull})) throw new Error("Not all of the values were null")`;

        return {
            functionName,
            imports: ['Null'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            paramSamples: nulls,
            body: `
            ${allNullCheck}

            return null;
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/null/test');

                    const result = await actor[functionName](...nulls);

                    return {
                        Ok: result === null
                    };
                }
            }
        };
    });

runPropTests(NullTestArb);
