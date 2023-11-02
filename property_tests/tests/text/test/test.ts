import fc from 'fast-check';

import { TextArb } from '../../../arbitraries/candid/primitive/text';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';

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

    const paramValues = paramTexts.map((text) => text.src.valueLiteral);

    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (${paramName} !== ${paramValues[index]}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

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
        (acc, text) => acc + text.value,
        returnTexts.value
    );
    const paramValues = paramTexts.map((text) => text.value);

    return {
        name: `text ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/text/test');

            const result = await actor[functionName](...paramValues);

            return {
                Ok: returnTexts.equals(result, expectedResult)
            };
        }
    };
}
