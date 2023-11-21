import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { TextArb } from '../../../arbitraries/candid/primitive/text';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const TextTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(TextArb),
        TextArb
    )
    .map(([functionName, paramTexts, defaultReturnText]): TestSample => {
        const imports = defaultReturnText.src.imports;

        const paramNames = paramTexts.map((_, index) => `param${index}`);
        const paramCandidTypes = paramTexts
            .map((text) => text.src.candidType)
            .join(', ');

        const returnCandidType = defaultReturnText.src.candidType;

        const body = generateBody(paramNames, paramTexts, defaultReturnText);

        const test = generateTest(functionName, paramTexts, defaultReturnText);

        return {
            imports,
            functionName,
            paramNames,
            paramCandidTypes,
            returnCandidType,
            body,
            test
        };
    });

runPropTests(TextTestArb);

function generateBody(
    paramNames: string[],
    paramTexts: CandidMeta<string>[],
    returnText: CandidMeta<string>
): string {
    const paramsAreStrings = paramNames
        .map((paramName) => {
            return `if (typeof ${paramName} !== 'string') throw new Error('${paramName} must be a string');`;
        })
        .join('\n');

    const returnStatement = paramNames.reduce((acc, paramName) => {
        return `${acc} + ${paramName}`;
    }, returnText.src.valueLiteral);

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramTexts
    );

    return `
        ${paramsAreStrings}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramTexts: CandidMeta<string>[],
    returnTexts: CandidMeta<string>
): Test {
    const expectedResult = paramTexts.reduce(
        (acc, text) => acc + text.agentResponseValue,
        returnTexts.agentResponseValue
    );
    const paramValues = paramTexts.map((text) => text.agentArgumentValue);

    return {
        name: `text ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/text/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: deepEqual(result, expectedResult)
            };
        }
    };
}
