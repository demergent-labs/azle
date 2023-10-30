import fc from 'fast-check';
import { deepEqual, shallowEqual } from 'fast-equals';

import { arePrincipalsEqual } from '../../../are_equal';
import { PrincipalArb } from '../../../arbitraries/candid/reference/principal_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { TestSample } from '../../../arbitraries/test_sample_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { getActor, runPropTests } from '../../../../property_tests';
import { Principal } from '@dfinity/principal';
import { Candid } from '../../../arbitraries/candid';
import { Test } from '../../../../test';

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
                .map((principal) => principal.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnPrincipal.src.candidType;

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

runPropTests(PrincipalTestArb);

function generateBody(
    paramNames: string[],
    paramPrincipals: Candid<Principal>[],
    returnPrincipal: Candid<Principal>
): string {
    const paramsArePrincipals = paramNames
        .map((paramName) => {
            return `if (${paramName}._isPrincipal !== true) throw new Error('${paramName} must be a Principal');`;
        })
        .join('\n');

    const returnStatement =
        paramPrincipals.length > 0
            ? `param0`
            : `Principal.fromText("${returnPrincipal.value.toText()}")`;

    const paramsCorrectlyOrdered = paramNames
        .map((paramName, index) => {
            const areEqual = arePrincipalsEqual(
                paramName,
                paramPrincipals[index].value
            );

            return `if (!${areEqual}) throw new Error('${paramName} is incorrectly ordered')`;
        })
        .join('\n');

    return `
        ${paramsArePrincipals}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}

function generateTest(
    functionName: string,
    paramPrincipals: Candid<Principal>[],
    returnPrincipal: Candid<Principal>
): Test {
    const expectedResult =
        paramPrincipals.length > 0
            ? paramPrincipals[0].value
            : returnPrincipal.value;

    return {
        name: `principal ${functionName}`,
        test: async () => {
            const actor = getActor('./tests/principal/test');
            const result = await actor[functionName](
                ...paramPrincipals.map((sample) => sample.value)
            );

            return { Ok: returnPrincipal.equals(result, expectedResult) };
        }
    };
}
