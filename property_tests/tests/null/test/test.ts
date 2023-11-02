import fc from 'fast-check';

import { NullArb } from '../../../arbitraries/candid/primitive/null';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

const NullTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(NullArb),
        NullArb
    )
    .map(([functionName, paramNulls, returnNull]): TestSample => {
        const imports = returnNull.src.imports;

        const paramNames = paramNulls.map((_, index) => `param${index}`);
        const paramCandidTypes = paramNulls
            .map((Null) => Null.src.candidType)
            .join(', ');

        const returnCandidType = returnNull.src.candidType;

        const body = generateBody(paramNames, returnNull);

        const test = generateTest(functionName, paramNulls, returnNull);

        return {
            functionName,
            imports,
            paramCandidTypes,
            returnCandidType,
            paramNames,
            body,
            test
        };
    });

runPropTests(NullTestArb);

function generateBody(
    paramNames: string[],
    returnNull: CandidMeta<null>
): string {
    const areAllNull = paramNames.reduce((acc, paramName) => {
        return `${acc} && ${paramName} === null`;
    }, 'true');

    const allNullCheck = `if (!(${areAllNull})) throw new Error("Not all of the values were null")`;

    return `
        ${allNullCheck}

        return ${returnNull.src.valueLiteral};
    `;
}

function generateTest(
    functionName: string,
    paramNulls: CandidMeta<null>[],
    returnNull: CandidMeta<null>
): Test {
    return {
        name: `test ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/null/test');

            const result = await actor[functionName](
                ...paramNulls.map((sample) => sample.value)
            );

            return {
                Ok: returnNull.equals(result, null)
            };
        }
    };
}
