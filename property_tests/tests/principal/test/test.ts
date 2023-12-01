import fc from 'fast-check';
import { deepEqual } from 'fast-equals';

import { PrincipalArb } from '../../../arbitraries/candid/reference/principal_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Principal } from '@dfinity/principal';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import { Test } from '../../../../test';
import { areParamsCorrectlyOrdered } from '../../../are_params_correctly_ordered';

const PrincipalTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(PrincipalArb),
        PrincipalArb
    )
    .map(
        ([
            functionName,
            paramPrincipals,
            defaultReturnPrincipal
        ]): TestSample => {
            const imports = defaultReturnPrincipal.src.imports;

            const paramNames = paramPrincipals.map(
                (_, index) => `param${index}`
            );
            const paramCandidTypes = paramPrincipals
                .map((principal) => principal.src.candidTypeObject)
                .join(', ');

            const returnCandidType =
                defaultReturnPrincipal.src.candidTypeObject;

            const body = generateBody(
                paramNames,
                paramPrincipals,
                defaultReturnPrincipal
            );

            const test = generateTest(
                functionName,
                paramPrincipals,
                defaultReturnPrincipal
            );

            return {
                imports,
                functionName,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                test
            };
        }
    );

runPropTests([PrincipalTestArb]);

function generateBody(
    paramNames: string[],
    paramPrincipals: CandidMeta<Principal>[],
    returnPrincipal: CandidMeta<Principal>
): string {
    const paramsArePrincipals = paramNames
        .map((paramName) => {
            return `if (${paramName}._isPrincipal !== true) throw new Error('${paramName} must be a Principal');`;
        })
        .join('\n');

    const returnStatement =
        paramPrincipals.length > 0
            ? `param0`
            : returnPrincipal.src.valueLiteral;

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(
        paramNames,
        paramPrincipals
    );

    return `
        ${paramsArePrincipals}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramPrincipals: CandidMeta<Principal>[],
    returnPrincipal: CandidMeta<Principal>
): Test {
    const expectedResult =
        paramPrincipals.length > 0
            ? paramPrincipals[0].agentResponseValue
            : returnPrincipal.agentResponseValue;

    return {
        name: `principal ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/principal/test');
            const result = await actor[functionName](
                ...paramPrincipals.map((sample) => sample.agentArgumentValue)
            );

            return { Ok: deepEqual(result, expectedResult) };
        }
    };
}
