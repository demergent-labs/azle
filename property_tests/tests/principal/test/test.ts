import fc from 'fast-check';
import { getActor } from '../../../get_actor';
import { PrincipalArb } from '../../../arbitraries/candid/reference/principal_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { runPropTests } from '../../..';
import { arePrincipalsEqual } from '../../../are_equal';

const PrincipalTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(PrincipalArb, { minLength: 1 })
    )
    .map(([functionName, principals]) => {
        const paramCandidTypes = principals.map(() => 'Principal').join(', ');
        const returnCandidType = 'Principal';
        const paramNames = principals.map((_, index) => `param${index}`);

        const paramsArePrincipals = paramNames
            .map((paramName) => {
                return `if (${paramName}._isPrincipal !== true) throw new Error('${paramName} must be a Principal');`;
            })
            .join('\n');

        const returnStatement = `param0`;

        const expectedResult = principals[0].toText();

        const paramsCorrectlyOrdered = paramNames
            .map((paramName, index) => {
                const areEqual = arePrincipalsEqual(
                    paramName,
                    principals[index]
                );

                return `if (!${areEqual}) throw new Error('${paramName} is incorrectly ordered')`;
            })
            .join('\n');

        return {
            functionName,
            imports: ['Principal'],
            paramCandidTypes,
            returnCandidType,
            paramNames,
            principals,
            body: `
                ${paramsCorrectlyOrdered}

                ${paramsArePrincipals}

                return ${returnStatement};
            `,
            test: {
                name: `test ${functionName}`,
                test: async () => {
                    const actor = getActor('./tests/principal/test');
                    const result = await actor[functionName](...principals);

                    return { Ok: result.toText() === expectedResult };
                }
            }
        };
    });

runPropTests(PrincipalTestArb);
