import fc from 'fast-check';

import { NullArb } from '../../../arbitraries/candid/primitive/null';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';

const NullTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(NullArb))
    .map(([functionName, nulls]): TestSample => {
        const paramCandidTypes = nulls
            .map((Null) => Null.meta.candidType)
            .join(', ');
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
            body: `
            ${allNullCheck}

            return null;
        `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/null/test');

                    const result = await actor[functionName](
                        ...nulls.map((sample) => sample.value)
                    );

                    return {
                        Ok: result === null
                    };
                }
            }
        };
    });

runPropTests(NullTestArb);
