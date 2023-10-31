import fc from 'fast-check';

import {
    createAreOptsEqualCodeDeclaration,
    createAreOptsEqualCodeUsage
} from '../../../are_equal/opt';
import { Opt, OptArb } from '../../../arbitraries/candid/constructed/opt_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

const OptTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(OptArb),
        OptArb
    )
    .map(([functionName, paramOpts, defaultReturnOpt]): TestSample => {
        const imports = new Set([
            'None',
            ...paramOpts.flatMap((opt) => [...opt.src.imports])
        ]);

        const paramNames = paramOpts.map((_, index) => `param${index}`);
        const paramCandidTypes = paramOpts
            .map((opt) => opt.src.candidType)
            .join(', ');

        // If there are not optTrees then we will be returning None so the type
        // here can be whatever as long as it's wrapped in Opt
        const returnCandidType =
            paramOpts.length === 0 ? 'Opt(int8)' : paramOpts[0].src.candidType;

        const body = generateBody(paramNames, paramOpts);

        const test = generateTest(functionName, paramOpts, defaultReturnOpt);

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

runPropTests(OptTestArb);

function isParamOpt(paramName: string): string {
    return `(${paramName}.Some !== undefined || ${paramName}.None !== undefined)`;
}

function generateBody(paramNames: string[], paramOpts: Candid<Opt>[]): string {
    const areParamsOpts = paramNames
        .map((paramName) => {
            return `if (!${isParamOpt(
                paramName
            )}) throw new Error('${paramName} must be an Opt');`;
        })
        .join('\n');

    const valueLiterals = paramOpts.map((opt) => opt.src.valueLiteral);

    const areParamsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            return `if (!${createAreOptsEqualCodeUsage(
                paramName,
                valueLiterals[index]
            )}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    const returnStatement = paramNames[0] ?? `None`;

    return `
        ${areParamsOpts}
        ${createAreOptsEqualCodeDeclaration()}
        ${areParamsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramOpts: Candid<Opt>[],
    returnOpt: Candid<Opt>
): Test {
    const expectedResult = paramOpts.length === 0 ? [] : paramOpts[0].value;
    return {
        name: `opt ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/opt/test');

            const params = paramOpts.map((opt) => opt.value);

            const result = await actor[functionName](...params);

            // TODO be careful on equality checks when we go beyond primitives
            // TODO a universal equality checker is going to be very useful
            return {
                Ok: returnOpt.equals(result, expectedResult)
            };
        }
    };
}
