import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { TextArb } from '../../../arbitraries/candid/primitive/text';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { QueryMethodArb } from '../../../arbitraries/query_method_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Test } from '../../../../test';

const AllTextQueryMethod = QueryMethodArb(fc.array(TextArb), TextArb, {
    generateBody,
    generateTests
});

runPropTests(CanisterArb(AllTextQueryMethod));

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

function generateTests(
    functionName: string,
    paramTexts: CandidMeta<string>[],
    returnTexts: CandidMeta<string>
): Test[] {
    const expectedResult = paramTexts.reduce(
        (acc, text) => acc + text.value,
        returnTexts.value
    );
    const paramValues = paramTexts.map((text) => text.value);

    return [
        {
            name: `text ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/text/test');

                const result = await actor[functionName](...paramValues);

                return {
                    Ok: deepEqual(result, expectedResult)
                };
            }
        }
    ];
}
