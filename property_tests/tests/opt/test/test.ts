import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { Opt, OptArb } from '../../../arbitraries/candid/constructed/opt_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const OptTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(OptArb),
        OptArb
    )
    .map(([functionName, paramOpts, defaultReturnOpt]): TestSample => {
        const imports = new Set([
            'None',
            ...paramOpts.flatMap((opt) => [...opt.src.imports]),
            ...defaultReturnOpt.src.imports
        ]);

        const paramNames = paramOpts.map((_, index) => `param${index}`);
        const paramCandidTypes = paramOpts
            .map((opt) => opt.src.candidType)
            .join(', ');

        const returnCandidType =
            paramOpts.length === 0
                ? defaultReturnOpt.src.candidType
                : paramOpts[0].src.candidType;

        const body = generateBody(paramNames, paramOpts, defaultReturnOpt);

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

function generateBody(
    paramNames: string[],
    paramOpts: CandidMeta<Opt>[],
    returnOpt: CandidMeta<Opt>
): string {
    const areParamsOpts = paramNames
        .map((paramName) => {
            return `if (!${isParamOpt(
                paramName
            )}) throw new Error('${paramName} must be an Opt');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramOpts
    );

    const returnStatement = paramNames[0] ?? returnOpt.src.valueLiteral;

    return `
        ${areParamsOpts}
        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramOpts: CandidMeta<Opt>[],
    returnOpt: CandidMeta<Opt>
): Test {
    const expectedResult =
        paramOpts.length === 0 ? returnOpt.value : paramOpts[0].value;
    return {
        name: `opt ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/opt/test');

            const params = paramOpts.map((opt) => opt.value);

            const result = await actor[functionName](...params);

            return {
                Ok: deepEqual(expectedResult, result)
            };
        }
    };
}
